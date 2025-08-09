import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { z } from "zod/v4";
import { auth } from "~/lib/auth";
import valkey from "~/lib/valkey";

export const sendMessage = createServerFn({ method: "POST" })
  .validator(
    z.object({
      message: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    // TODO: Move this to authMiddleware
    const request = getWebRequest();
    if (!request?.headers) {
      throw new Error("No headers were found");
    }
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session) {
      throw new Error("No session was found");
    }
    valkey.publish(
      "chat",
      JSON.stringify({
        kind: "user",
        data,
        meta: {
          id: nanoid(),
          timestamp: dayjs().toISOString(),
          author: session.user.name,
        },
      }),
    );
  });
