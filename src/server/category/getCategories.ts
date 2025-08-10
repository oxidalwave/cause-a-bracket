import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { category } from "~/db/schema";
import type { CategoryDto } from "~/lib/dto/category";

const getCategories = createServerFn()
  .validator(z.object({}))
  .handler(
    async (): Promise<CategoryDto[]> =>
      await db
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
        .from(category),
  );

export default getCategories;
