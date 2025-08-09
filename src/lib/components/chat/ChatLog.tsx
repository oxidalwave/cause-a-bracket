import { ScrollArea, Stack } from "@mantine/core";
import type { z } from "zod/v4";
import type { ChatStreamMessage } from "~/lib/server/functions/chat/streamChat";
import ChatMessage from "./ChatMessage";

type ChatLogProps = {
  messages: (z.infer<typeof ChatStreamMessage> & { kind: "user" })[];
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
