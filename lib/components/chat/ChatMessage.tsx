import { Card, Group, Text } from "@mantine/core";
import dayjs from "dayjs";
import type { Message } from "~lib/validators/chat/Message";

type ChatMessageProps = {
	message: Message;
};

export default function ChatMessage({ message }: ChatMessageProps) {
	return (
		<Card withBorder>
			<Group justify="space-between">
				<Text fw={650}>{message.author}</Text>
				<Text c="dimmed">{dayjs(message.timestamp).format("HH:mmA")}</Text>
			</Group>
			<Text>{message.message}</Text>
		</Card>
	);
}
