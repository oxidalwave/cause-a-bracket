import { z } from "zod/v4";

export const CreateMetaSchema = z.object({
  createdAt: z.coerce.date(),
  createdBy: z.string().min(1),
});

export type CreateMetaDto = z.infer<typeof CreateMetaSchema>;
