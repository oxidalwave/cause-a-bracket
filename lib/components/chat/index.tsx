import { Button, Drawer, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChatIcon } from "@phosphor-icons/react";
import ChatBox from "./ChatBox";
import ChatLog from "./ChatLog";

export default function Chat() {
	const [opened, { open, close }] = useDisclosure();

	return (
		<>
			<Button onClick={open}>
				<ChatIcon />
			</Button>
			<Drawer position="right" opened={opened} onClose={close}>
				<Stack>
					<ChatLog />
					<ChatBox />
				</Stack>
			</Drawer>
		</>
	);
}
