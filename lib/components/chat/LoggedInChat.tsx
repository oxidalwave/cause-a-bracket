import { Stack } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { uniqWith } from "~lib/utils/collections/uniqWith";
import { Message } from "~lib/validators/chat/Message";
import { useWs } from "../util/Providers/WsProvider";
import ChatForm from "./ChatBox";
import ChatLog from "./ChatLog";

type LoggedInChat = {
	user: string;
};

export default function LoggedInChat({ user }: LoggedInChat) {
	const [messages, setMessages] = useState<Message[]>([]);
	const ws = useWs();

	const handleSendMessage = async (formData: FormData) => {
		if (ws === null) {
			return;
		}
		const message = Message.omit({ id: true, timestamp: true }).parse({
			author: user,
			message: formData.get("message") ?? "",
		});
		setMessages((messages) =>
			uniqWith(
				[
					...messages,
					{ ...message, id: crypto.randomUUID(), timestamp: new Date() },
				],
				(a, b) => a.id === b.id,
			),
		);
		ws.send(JSON.stringify(message));
	};

	const handleReceiveMessage = useCallback((m: MessageEvent) => {
		const message = Message.parse(JSON.parse(m.data));
		setMessages((messages) =>
			uniqWith([...messages, message], (a, b) => a.id === b.id),
		);
	}, []);

	useEffect(() => {
		ws?.addEventListener("message", handleReceiveMessage);
		return () => {
			ws?.removeEventListener("message", handleReceiveMessage);
		};
	}, [ws, handleReceiveMessage]);

	return (
		<>
			<Stack>
				<ChatLog messages={messages} user={user} />
				<ChatForm action={handleSendMessage} disabled={ws === null} />
			</Stack>
		</>
	);
}
