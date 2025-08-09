import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { category } from "~/db/schema";

const getCategory = createServerFn()
  .validator(z.object({}))
  .handler(
    async () =>
      await db
        .select({
          id: category.id,
          name: category.name,
        })
        .from(category),
  );

export default getCategory;
