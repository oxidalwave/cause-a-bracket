import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { image } from "~/db/schema";
import { IdSchema } from "~/lib/dto/utils/id";
import authMiddleware from "~/server/middleware/authMiddleware";
import atomic from "~/server/utils/atomic";

const getImage = createServerFn()
  .middleware([authMiddleware])
  .validator(z.object({ id: IdSchema }))
  .handler(async ({ data }) => {
    const result = await atomic(
      db
        .select({
          id: image.id,
          image: image.image,
          mimeType: image.mimeType,
        })
        .from(image)
        .where(eq(image.id, data.id)),
    );

    const uint8 = new Uint8Array(result.image);
    const blob = new Blob([uint8], { type: result.mimeType });
    return URL.createObjectURL(blob);
  });

export default getImage;
