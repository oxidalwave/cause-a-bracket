import {
  ActionIcon,
  Badge,
  Button,
  Drawer,
  Indicator,
  Stack,
} from "@mantine/core";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { ChatIcon } from "@phosphor-icons/react";
import dayjs from "dayjs";
import { z } from "zod/v4";
import { sendMessage } from "~/lib/chat/sendMessage";
import { ChatStreamMessage, streamChat } from "~/lib/chat/streamChat";
import useStream from "~/lib/hooks/useStream";
import ChatForm from "./ChatBox";
import ChatMessage from "./ChatMessage";

export default function Chat() {
  const [opened, { open, close }] = useDisclosure();
  const [upToDate, { open: setUpToDate, close: setNotUpToDate }] =
    useDisclosure();

  const data = useStream({
    queryKey: ["chat"],
    queryFn: streamChat,
    schema: ChatStreamMessage,
    onChunk: () => {
      setNotUpToDate();
    },
  });

  function handleOpen() {
    open();
    setUpToDate();
  }

  return (
    <>
      <Indicator disabled={upToDate} color="red">
        <ActionIcon onClick={handleOpen}>
          <ChatIcon />
        </ActionIcon>
      </Indicator>
      <Drawer position="right" title="Chat" opened={opened} onClose={close}>
        <Stack>
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
        </Stack>
      </Drawer>
    </>
  );
}
