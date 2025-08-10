import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { descriptor } from "~/db/schema";
import authMiddleware from "~/server/middleware/authMiddleware";
import atomic from "~/server/utils/atomic";
import { generateExistingMeta } from "~/server/utils/generateExistingMeta";

const updateDescriptor = createServerFn()
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number().int().min(1), name: z.string().min(1) }))
  .handler(
    async ({ context, data }) =>
      await atomic(
        db
          .update(descriptor)
          .set({
            name: data.name,
            ...generateExistingMeta({ user: { id: context.session.user.id } }),
          })
          .where(eq(descriptor.id, data.id))
          .returning({ id: descriptor.id }),
      ),
  );

export default updateDescriptor;
