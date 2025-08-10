import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { category } from "~/db/schema";
import type { CategoryDto } from "~/lib/dto/category";
import atomic from "~/server/utils/atomic";

const getCategory = createServerFn()
  .validator(z.object({ id: z.number().int().min(1) }))
  .handler(
    async ({ data }): Promise<CategoryDto> =>
      await atomic(
        db
          .select({
            id: category.id,
            name: category.name,
            meta: {
              createdAt: category.createdAt,
              createdBy: category.createdBy,
              updatedAt: category.updatedAt,
              updatedBy: category.updatedBy,
            },
          })
          .from(category)
          .where(eq(category.id, data.id)),
      ),
  );

export default getCategory;
