import { z } from "zod";

export const EntrantValidator = z.string();

export type Entrant = z.infer<typeof EntrantValidator>;
