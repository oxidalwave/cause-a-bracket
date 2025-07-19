import { z } from "zod/v4";
import { Meta } from "~/lib/validators/util/meta";

export const CabChat = z.object({
  message: z.string(),
});

export type CabChat = z.infer<typeof CabChat>;

export const CabChatClientMessage = z.object({
  kind: z.literal("message"),
  data: CabChat,
});

export type CabChatClientMessage = z.infer<typeof CabChatClientMessage>;

export const CabChatServerEvent = z.object({
  kind: z.literal("message"),
  data: CabChat,
  meta: Meta,
});

export type CabChatServerEvent = z.infer<typeof CabChatServerEvent>;
