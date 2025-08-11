import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";
import db from "~/db/drizzle";
import { image } from "~/db/schema";
import authMiddleware from "~/server/middleware/authMiddleware";
import atomic from "~/server/utils/atomic";

class InvalidImageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidImageError";
  }
}

const createImage = createServerFn()
  .middleware([authMiddleware])
  .validator(z.instanceof(FormData))
  .handler(async ({ data }) => {
    const imageBlob = data.get("image");
    if (!(imageBlob instanceof Blob)) {
      throw new InvalidImageError("Invalid image data");
    }
    const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());
    const mimeType = imageBlob.type;
    return await atomic(
      db
        .insert(image)
        .values({ image: imageBuffer, mimeType })
        .returning({ id: image.id }),
    );
  });

export default createImage;
