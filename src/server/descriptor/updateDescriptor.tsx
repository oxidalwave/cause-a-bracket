import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { descriptor } from "~/db/schema";

const updateDescriptor = createServerFn()
  .validator(z.object({ id: z.number().int().min(1), name: z.string().min(1) }))
  .handler(
    async ({ data }) =>
      await db
        .update(descriptor)
        .set({ name: data.name })
        .where(eq(descriptor.id, data.id))
        .returning({ id: descriptor.id }),
  );

export default updateDescriptor;
