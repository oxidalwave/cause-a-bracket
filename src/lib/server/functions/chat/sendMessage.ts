import { createServerFn } from "@tanstack/react-start";
import dayjs from "dayjs";
import { z } from "zod/v4";
import { authMiddleware } from "~/lib/server/middleware/auth";
import { loggerMiddleware } from "~/lib/server/middleware/logger";
import valkey from "~/lib/valkey";

export const sendMessage = createServerFn({ method: "POST" })
  .validator(
    z.object({
      message: z.string(),
    }),
  )
  .middleware([loggerMiddleware, authMiddleware])
  .handler(({ context, data }) => {
    valkey.publish(
      "chat",
      JSON.stringify({
        kind: "message",
        data,
        meta: {
          id: crypto.randomUUID(),
          timestamp: dayjs().toISOString(),
          author: context.session?.user?.name,
        },
      }),
    );
  });
