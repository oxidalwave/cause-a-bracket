import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { entry } from "~/db/schema";
import { IdSchema } from "~/lib/dto/utils/id";
import loggingMiddleware from "~/server/middleware/loggingMiddleware";

const getCategoryEntries = createServerFn()
  .middleware([loggingMiddleware])
  .validator(z.object({ category: z.object({ id: IdSchema }) }))
  .handler(
    async ({ data }) =>
      await db
        .select({
          id: entry.id,
          name: entry.name,
          description: entry.description,
          meta: {
            createdAt: entry.createdAt,
            createdBy: entry.createdBy,
            updatedAt: entry.updatedAt,
            updatedBy: entry.updatedBy,
          },
        })
        .from(entry)
        .where(eq(entry.categoryId, data.category.id)),
  );

export default getCategoryEntries;
