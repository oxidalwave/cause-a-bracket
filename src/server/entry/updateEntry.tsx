import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { entry } from "~/db/schema";

const updateEntry = createServerFn()
  .validator(
    z.object({
      id: z.number().int().min(1),
      name: z.string().min(1),
      description: z.string().min(1).optional(),
    }),
  )
  .handler(
    async ({ data }) =>
      await db
        .update(entry)
        .set({
          name: data.name,
          description: data.description,
        })
        .where(eq(entry.id, data.id))
        .returning({ id: entry.id }),
  );

export default updateEntry;
