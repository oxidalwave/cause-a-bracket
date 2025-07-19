import { Card, Group, Text } from "@mantine/core";
import type { z } from "zod/v4";
import type { ChatStreamMessage } from "~/lib/server/functions/chat/streamChat";

type ChatMessageProps = {
  message: z.infer<typeof ChatStreamMessage> & { kind: "message" };
};

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <Card withBorder>
      <Group justify="space-between">
        <Text fw={650}>{message.data.author}</Text>
        <Text c="dimmed">{message.meta.timestamp}</Text>
      </Group>
      <Text>{message.data.message}</Text>
    </Card>
  );
}
