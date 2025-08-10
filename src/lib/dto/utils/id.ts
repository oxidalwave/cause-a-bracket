import { z } from "zod/v4";

export const IdSchema = z.number().int().min(1);

export type IdDto = z.infer<typeof IdSchema>;
