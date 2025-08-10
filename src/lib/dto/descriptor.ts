import { z } from "zod/v4";
import { IdSchema } from "~/lib/dto/utils/id";
import { MetaSchema } from "~/lib/dto/utils/meta";

export const DescriptorSchema = z.object({
  id: IdSchema,
  name: z.string().min(1),
  meta: MetaSchema,
});

export type DescriptorDto = z.infer<typeof DescriptorSchema>;
