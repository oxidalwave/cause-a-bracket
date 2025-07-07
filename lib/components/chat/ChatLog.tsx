import { Stack } from "@mantine/core";
import type { Message } from "~lib/validators/chat/Message";
import ChatMessage from "./ChatMessage";

type ChatLogProps = {
	messages: Message[];
	user: string;
};

export default function ChatLog({ messages }: ChatLogProps) {
	return (
		<Stack>
			{messages.map((message) => (
				<ChatMessage key={message.id} message={message} />
			))}
		</Stack>
	);
}
