import { createServerFn } from "@tanstack/react-start";
import dayjs from "dayjs";
import Valkey from "iovalkey";
import { nanoid } from "nanoid";
import { match } from "ts-pattern";
import { z } from "zod/v4";
import useStream, { type UseStreamOptions } from "~/lib/hooks/useStream";
import { Meta } from "~/lib/validators/util/meta";

const SystemMessage = z.object({
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
});

const UserMessage = z.object({
  kind: z.literal("user"),
  meta: Meta,
  data: z.object({
    message: z.string(),
  }),
});

export const ChatStreamMessage = z.discriminatedUnion("kind", [
  SystemMessage,
  UserMessage,
]);

const encoder = new TextEncoder();

const sendChatMessage = (
  controller: ReadableStreamDefaultController,
  message: z.infer<typeof ChatStreamMessage>,
) => {
  const stringified = JSON.stringify(message);
  const encoded = encoder.encode(stringified);
  controller.enqueue(encoded);
};

export const streamChat = createServerFn({ response: "raw" }).handler(
  ({ signal }) => {
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

        valkey.on("message", (channel, message) =>
          match([{ channel }, ChatStreamMessage.safeParse(JSON.parse(message))])
            .with([{}, { success: false }], ([_, { error }]) => {
              console.error("Invalid message received:", error);
              sendChatMessage(controller, {
                kind: "system",
                meta: {
                  id: nanoid(),
                  timestamp: dayjs().toISOString(),
                },
                data: {
                  event: "error",
                  message: `Invalid message format: ${error.message}`,
                },
              });
            })
            .with(
              [{ channel: "chat" }, { success: true, data: { kind: "user" } }],
              ([_, { data }]) => {
                sendChatMessage(controller, data);
              },
            )
            .run(),
        );

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
  },
);

export const useStreamChat = (
  opts: Pick<UseStreamOptions<z.infer<typeof ChatStreamMessage>>, "onChunk">,
) =>
  useStream({
    queryKey: ["chat"],
    queryFn: streamChat,
    schema: ChatStreamMessage,
    ...opts,
  });
