import { ScrollArea, Stack } from "@mantine/core";
import type { z } from "zod/v4";
import type { ChatStreamMessage } from "~/lib/chat/streamChat";
import ChatMessage from "./ChatMessage";

type ChatLogProps = {
  messages: (z.infer<typeof ChatStreamMessage> & { kind: "message" })[];
  user: string;
};

export default function ChatLog({ messages }: ChatLogProps) {
  return (
    <ScrollArea.Autosize>
      <Stack>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </Stack>
    </ScrollArea.Autosize>
  );
}
