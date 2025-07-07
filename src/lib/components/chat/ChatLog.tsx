import { ScrollArea, Stack } from "@mantine/core";
import type { CabChatServerEvent } from "src/lib/validators/chat/Message";
import ChatMessage from "./ChatMessage";

type ChatLogProps = {
	messages: CabChatServerEvent[];
	user: string;
};

export default function ChatLog({ messages }: ChatLogProps) {
	return (
		<ScrollArea.Autosize>
			<Stack>
				{messages.map((message) => (
					<ChatMessage key={message.meta.id} message={message} />
				))}
			</Stack>
		</ScrollArea.Autosize>
	);
}
