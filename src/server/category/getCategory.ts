import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { category } from "~/db/schema";

const getCategory = createServerFn()
  .validator(z.object({ id: z.number().int().min(1) }))
  .handler(
    async ({ data }) =>
      await db
        .select({
          name: category.name,
        })
        .from(category)
        .where(eq(category.id, data.id)),
  );

export default getCategory;
