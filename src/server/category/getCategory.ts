import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { category } from "~/db/schema";
import type { CategoryDto } from "~/lib/dto/category";
import { IdSchema } from "~/lib/dto/utils/id";
import loggingMiddleware from "~/server/middleware/loggingMiddleware";
import atomic from "~/server/utils/atomic";

const getCategory = createServerFn()
  .middleware([loggingMiddleware])
  .validator(z.object({ id: IdSchema }))
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
