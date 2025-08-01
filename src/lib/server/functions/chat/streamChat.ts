import { createServerFn } from "@tanstack/react-start";
import dayjs from "dayjs";
import Valkey from "iovalkey";
import { nanoid } from "nanoid";
import { z } from "zod/v4";
import { loggerMiddleware } from "~/lib/server/middleware/logger";
import { sendMessage } from "~/lib/streams/message";
import { Meta } from "~/lib/validators/util/meta";

export const ChatStreamMessage = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("system"),
    meta: Meta.omit({ author: true }),
    data: z.discriminatedUnion("event", [
      z.object({
        event: z.enum(["connected", "disconnected"]),
      }),
      z.object({
        event: z.enum(["error"]),
        message: z.string(),
      }),
    ]),
  }),
  z.object({
    kind: z.literal("message"),
    meta: Meta,
    data: z.object({
      message: z.string(),
    }),
  }),
]);

const sendChatMessage = sendMessage<z.infer<typeof ChatStreamMessage>>;

export const streamChat = createServerFn({ response: "raw" })
  .middleware([loggerMiddleware])
  .handler(({ signal }) => {
    const stream = new ReadableStream({
      async start(controller) {
        const valkey = new Valkey(import.meta.env.VITE_REDIS_CONNECTION_STRING);

        valkey.subscribe("chat", (err) => {
          if (err) {
            console.error("Failed to subscribe: %s", err.message);
            sendChatMessage(controller, {
              kind: "system",
              meta: {
                id: nanoid(),
                timestamp: dayjs().toISOString(),
              },
              data: {
                event: "error",
                message: err.message,
              },
            });
            controller.close();
          } else {
            console.log("Subscribed to chat channel");
            sendChatMessage(controller, {
              kind: "system",
              meta: {
                id: nanoid(),
                timestamp: dayjs().toISOString(),
              },
              data: {
                event: "connected",
              },
            });
          }
        });

        valkey.on("message", (channel, message) => {
          const parsedMessage = JSON.parse(message);
          const validated = ChatStreamMessage.safeParse(parsedMessage);
          if (!validated.success) {
            console.error("Invalid message received:", validated.error);
            sendChatMessage(controller, {
              kind: "system",
              meta: {
                id: nanoid(),
                timestamp: dayjs().toISOString(),
              },
              data: {
                event: "error",
                message: `Invalid message format: ${validated.error.message}`,
              },
            });
            return;
          }
          switch (channel) {
            case "chat":
              switch (validated.data.kind) {
                case "system":
                  break;
                case "message":
                  sendChatMessage(controller, validated.data);
                  break;
                default:
                  console.warn("Unknown message kind:", validated.data);
              }
              break;
            default:
              break;
          }
        });

        signal.addEventListener("abort", () => {
          valkey.unsubscribe("chat", (err) => {
            if (err) {
              console.error("Failed to unsubscribe: %s", err.message);
            } else {
              sendChatMessage(controller, {
                kind: "system",
                meta: {
                  id: nanoid(),
                  timestamp: dayjs().toISOString(),
                },
                data: {
                  event: "disconnected",
                },
              });
            }
          });
          valkey.disconnect();
          controller.close();
        });
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  });
