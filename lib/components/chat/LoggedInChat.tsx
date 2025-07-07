import { Stack } from "@mantine/core";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { uniqWith } from "~lib/utils/collections/uniqWith";
import type { CabChatServerEvent } from "~lib/validators/chat/Message";
import { CabServerEvent } from "~lib/validators/events";
import { useWs } from "../util/Providers/WsProvider";
import ChatForm from "./ChatBox";
import ChatLog from "./ChatLog";

type LoggedInChat = {
	user: string;
};

export default function LoggedInChat({ user }: LoggedInChat) {
	const [messages, setMessages] = useState<CabChatServerEvent[]>([]);
	const ws = useWs();

	const handleSendMessage = async (formData: FormData) => {
		if (ws === null) {
			return;
		}
		// TODO: Use optimistic updates
		const message = {
			kind: "message" as const,
			data: {
				author: user,
				message: String(formData.get("message")) ?? "",
			},
			meta: {
				id: crypto.randomUUID(),
				timestamp: dayjs().unix(),
			},
		};
		setMessages((ms) =>
			uniqWith([...ms, message], (a, b) => a.meta.id === b.meta.id),
		);
		ws.send(JSON.stringify(message));
	};

	const handleReceiveMessage = useCallback(
		(e: WebSocketEventMap["message"]) => {
			const message = CabServerEvent.parse(JSON.parse(e.data));
			setMessages((messages) =>
				uniqWith([...messages, message], (a, b) => a.meta.id === b.meta.id),
			);
		},
		[],
	);

	useEffect(() => {
		ws?.addEventListener("message", handleReceiveMessage);
		return () => {
			ws?.removeEventListener("message", handleReceiveMessage);
		};
	}, [ws, handleReceiveMessage]);

	return (
		<Stack justify="space-between" style={{ height: "calc(100dvh - 5rem)" }}>
			<ChatLog messages={messages} user={user} />
			<ChatForm action={handleSendMessage} disabled={ws === null} />
		</Stack>
	);
}
