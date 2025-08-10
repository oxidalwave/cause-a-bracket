import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { entry } from "~/db/schema";
import authMiddleware from "~/server/middleware/authMiddleware";
import loggingMiddleware from "~/server/middleware/loggingMiddleware";
import atomic from "~/server/utils/atomic";
import { generateExistingMeta } from "~/server/utils/generateExistingMeta";

const updateEntry = createServerFn()
  .middleware([loggingMiddleware, authMiddleware])
  .validator(
    z.object({
      id: z.number().int().min(1),
      name: z.string().min(1),
      description: z.string().min(1).optional(),
    }),
  )
  .handler(
    async ({ context, data }) =>
      await atomic(
        db
          .update(entry)
          .set({
            name: data.name,
            description: data.description,
            ...generateExistingMeta({ user: { id: context.session.user.id } }),
          })
          .where(eq(entry.id, data.id))
          .returning({ id: entry.id }),
      ),
  );

export default updateEntry;
