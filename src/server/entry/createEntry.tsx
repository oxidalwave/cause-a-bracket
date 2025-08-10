import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { entry } from "~/db/schema";
import authMiddleware from "~/server/middleware/authMiddleware";
import atomic from "~/server/utils/atomic";
import { generateNewMeta } from "~/server/utils/generateNewMeta";

const createEntry = createServerFn()
  .middleware([authMiddleware])
  .validator(
    z.object({
      name: z.string().min(1),
      description: z.string().min(1).optional(),
      category: z.object({ id: z.number().int().min(1) }),
    }),
  )
  .handler(
    async ({ context, data }) =>
      await atomic(
        db
          .insert(entry)
          .values({
            name: data.name,
            description: data.description,
            categoryId: data.category.id,
            ...generateNewMeta({ user: { id: context.session.user.id } }),
          })
          .returning({ id: entry.id }),
      ),
  );

export default createEntry;
