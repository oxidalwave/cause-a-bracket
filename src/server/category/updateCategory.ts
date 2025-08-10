import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { category } from "~/db/schema";
import authMiddleware from "~/server/middleware/authMiddleware";
import atomic from "~/server/utils/atomic";
import { generateExistingMeta } from "~/server/utils/generateExistingMeta";

const updateCategory = createServerFn()
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number().int().min(1), name: z.string().min(1) }))
  .handler(
    async ({ context, data }) =>
      await atomic(
        db
          .update(category)
          .set({
            name: data.name,
            ...generateExistingMeta({ user: { id: context.session.user.id } }),
          })
          .where(eq(category.id, data.id))
          .returning({ id: category.id }),
      ),
  );

export default updateCategory;
