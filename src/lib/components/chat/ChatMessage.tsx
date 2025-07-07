import { Card, Group, Text } from "@mantine/core";
import dayjs from "dayjs";
import type { CabChatServerEvent } from "src/lib/validators/chat/Message";

type ChatMessageProps = {
	message: CabChatServerEvent;
};

export default function ChatMessage({ message }: ChatMessageProps) {
	return (
		<Card withBorder>
			<Group justify="space-between">
				<Text fw={650}>{message.data.author}</Text>
				<Text c="dimmed">{dayjs(message.meta.timestamp).format("HH:mmA")}</Text>
			</Group>
			<Text>{message.data.message}</Text>
		</Card>
	);
}
