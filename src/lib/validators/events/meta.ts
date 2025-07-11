import { z } from "zod/v4";

export const CabServerEventMeta = z.object({
  id: z.uuid(),
  timestamp: z.number().int(),
});

export type CabServerEventMeta = z.infer<typeof CabServerEventMeta>;
