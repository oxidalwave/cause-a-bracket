import { z } from "zod/v4";

export const Message = z.object({
	id: z.uuid(),
	author: z.string(),
	message: z.string(),
	timestamp: z.coerce.date(),
});

export type Message = z.infer<typeof Message>;
