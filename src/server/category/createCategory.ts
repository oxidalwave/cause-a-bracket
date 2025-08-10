import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { category } from "~/db/schema";
import authMiddleware from "~/server/middleware/authMiddleware";
import loggingMiddleware from "~/server/middleware/loggingMiddleware";
import atomic from "~/server/utils/atomic";
import { generateNewMeta } from "~/server/utils/generateNewMeta";

const createCategory = createServerFn()
  .middleware([loggingMiddleware, authMiddleware])
  .validator(z.object({ name: z.string().min(1) }))
  .handler(
    async ({ context, data }) =>
      await atomic(
        db
          .insert(category)
          .values({
            name: data.name,
            ...generateNewMeta({ user: { id: context.session.user.id } }),
          })
          .returning({ id: category.id }),
      ),
  );

export default createCategory;
