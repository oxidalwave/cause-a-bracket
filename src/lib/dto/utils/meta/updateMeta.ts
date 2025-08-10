import { z } from "zod/v4";

export const UpdateMetaSchema = z.object({
  updatedAt: z.coerce.date(),
  updatedBy: z.string().min(1),
});

export type UpdateMetaDto = z.infer<typeof UpdateMetaSchema>;
