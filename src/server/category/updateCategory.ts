import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { category } from "~/db/schema";

const updateCategory = createServerFn()
  .validator(z.object({ id: z.number().int().min(1), name: z.string().min(1) }))
  .handler(
    async ({ data }) =>
      await db
        .update(category)
        .set({ name: data.name })
        .where(eq(category.id, data.id))
        .returning({ id: category.id }),
  );

export default updateCategory;
