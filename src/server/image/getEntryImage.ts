import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { entry, image } from "~/db/schema";
import { IdSchema } from "~/lib/dto/utils/id";
import authMiddleware from "~/server/middleware/authMiddleware";
import atomic from "~/server/utils/atomic";

const getEntryImage = createServerFn()
  .middleware([authMiddleware])
  .validator(z.object({ entry: z.object({ id: IdSchema }) }))
  .handler(async ({ data }) => {
    const result = await atomic(
      db
        .select({
          id: image.id,
          image: image.image,
          mimeType: image.mimeType,
        })
        .from(entry)
        .innerJoin(image, eq(entry.imageId, image.id))
        .where(eq(entry.id, data.entry.id)),
    );

    const uint8 = new Uint8Array(result.image);
    const blob = new Blob([uint8], { type: result.mimeType });
    return URL.createObjectURL(blob);
  });

export default getEntryImage;
