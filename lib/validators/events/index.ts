import { z } from "zod/v4";
import { CabChatClientMessage, CabChatServerEvent } from "../chat/Message";

export const CabClientMessage = z.discriminatedUnion("kind", [
	CabChatClientMessage,
]);

export type CabClientMessage = z.infer<typeof CabClientMessage>;

export const CabServerEvent = z.discriminatedUnion("kind", [
	CabChatServerEvent,
]);

export type CabServerEvent = z.infer<typeof CabServerEvent>;
