import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { descriptor } from "~/db/schema";

const createDescriptor = createServerFn()
  .validator(z.object({ name: z.string().min(1) }))
  .handler(
    async ({ data }) =>
      await db.insert(descriptor).values(data).returning({ id: descriptor.id }),
  );

export default createDescriptor;
