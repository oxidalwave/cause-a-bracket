import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { descriptor } from "~/db/schema";
import authMiddleware from "~/server/middleware/authMiddleware";
import atomic from "~/server/utils/atomic";
import { generateNewMeta } from "~/server/utils/generateNewMeta";

const createDescriptor = createServerFn()
  .middleware([authMiddleware])
  .validator(z.object({ name: z.string().min(1) }))
  .handler(
    async ({ context, data }) =>
      await atomic(
        db
          .insert(descriptor)
          .values({
            name: data.name,
            ...generateNewMeta({ user: { id: context.session.user.id } }),
          })
          .returning({ id: descriptor.id }),
      ),
  );

export default createDescriptor;
