import type { z } from "zod/v4";
import { CreateMetaSchema } from "~/lib/dto/utils/meta/createMeta";
import { UpdateMetaSchema } from "~/lib/dto/utils/meta/updateMeta";

export const MetaSchema = CreateMetaSchema.and(UpdateMetaSchema);

export type MetaDto = z.infer<typeof MetaSchema>;
