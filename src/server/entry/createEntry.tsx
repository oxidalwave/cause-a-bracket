import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { entry } from "~/db/schema";

const createEntry = createServerFn()
  .validator(
    z.object({
      name: z.string().min(1),
      description: z.string().min(1).optional(),
      category: z.object({ id: z.number().int().min(1) }),
    }),
  )
  .handler(
    async ({ data }) =>
      await db
        .insert(entry)
        .values({
          name: data.name,
          description: data.description,
          categoryId: data.category.id,
        })
        .returning({ id: entry.id }),
  );

export default createEntry;
