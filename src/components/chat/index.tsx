import { ActionIcon, Drawer, Indicator, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChatIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { z } from "zod/v4";
import { sendMessage } from "~/lib/chat/sendMessage";
import { useStreamChat } from "~/lib/chat/streamChat";
import ChatForm from "./ChatBox";
import ChatMessage from "./ChatMessage";

export default function Chat() {
  const [opened, { open, close }] = useDisclosure();
  const [read, setRead] = useState(true);

  const data = useStreamChat({
    onChunk: () => {
      if (!opened) {
        setRead(false);
      }
    },
  });

  function handleOpen() {
    open();
    setRead(true);
  }

  return (
    <>
      <Indicator disabled={read} color="red">
        <ActionIcon onClick={handleOpen}>
          <ChatIcon />
        </ActionIcon>
      </Indicator>
      <Drawer position="right" title="Chat" opened={opened} onClose={close}>
        <Stack>
          <Stack>
            {data
              .filter((d) => d.kind === "user")
              .map((d) => (
                <ChatMessage key={d.meta.id} message={d} />
              ))}
          </Stack>
          <ChatForm
            action={async (formData) => {
              await sendMessage({
                data: {
                  message: z.string().parse(formData.get("message")),
                },
              });
            }}
          />
        </Stack>
      </Drawer>
    </>
  );
}
