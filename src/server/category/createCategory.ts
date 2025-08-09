import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { category } from "~/db/schema";

const createCategory = createServerFn()
  .validator(z.object({ name: z.string().min(1) }))
  .handler(
    async ({ data }) =>
      await db.insert(category).values(data).returning({ id: category.id }),
  );

export default createCategory;
