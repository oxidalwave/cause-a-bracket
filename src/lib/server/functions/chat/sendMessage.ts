import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";
import { handlePublish } from "~/lib/server/handlers/handlePublish";
import { loggerMiddleware } from "~/lib/server/middleware/logger";

export const sendMessage = createServerFn({ method: "POST" })
  .validator(
    z.object({
      message: z.string(),
      author: z.string(),
    }),
  )
  .middleware([loggerMiddleware])
  .handler(handlePublish("chat", "message"));
