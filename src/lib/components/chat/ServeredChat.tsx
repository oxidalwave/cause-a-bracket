import { Button, Drawer, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChatIcon } from "@phosphor-icons/react";
import dayjs from "dayjs";
import { sendMessage } from "~/lib/chat/sendMessage";
import { ChatStreamMessage, streamChat } from "~/lib/chat/streamChat";
import useStream from "~/lib/hooks/useStream";
import ChatForm from "./ChatBox";
import ChatMessage from "./ChatMessage";
import { z } from "zod/v4";

export default function ServeredChat() {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <Button onClick={open} variant="outline">
        <ChatIcon />
      </Button>
      <Drawer position="right" title="Chat" opened={opened} onClose={close}>
        <ServeredChatLoaded />
      </Drawer>
    </>
  );
}

function ServeredChatLoaded() {
  const data = useStream({
    queryKey: ["chat"],
    queryFn: streamChat,
    schema: ChatStreamMessage,
  });

  return (
    <>
      <Stack>
        {data
          .filter((d) => d.kind === "message")
          .map((d) => (
            <ChatMessage key={d.id} message={d} />
          ))}
      </Stack>
      <ChatForm
        action={async (formData) => {
          await sendMessage({
            data: {
              message: z.string().parse(formData.get("message")),
              author: "User",
              timestamp: dayjs().toISOString(),
            },
          });
        }}
      />
    </>
  );
}
