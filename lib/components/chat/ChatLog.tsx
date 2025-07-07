import { Stack } from "@mantine/core";
import type { CabChatServerEvent } from "~lib/validators/chat/Message";
import ChatMessage from "./ChatMessage";

type ChatLogProps = {
	messages: CabChatServerEvent[];
	user: string;
};

export default function ChatLog({ messages }: ChatLogProps) {
	return (
		<Stack>
			{messages.map((message) => (
				<ChatMessage key={message.meta.id} message={message} />
			))}
		</Stack>
	);
}
