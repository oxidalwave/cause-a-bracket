import { ActionIcon, Group, TextInput } from "@mantine/core";
import { PaperPlaneIcon } from "@phosphor-icons/react";
import { useWs } from "../util/Providers/WsProvider";

type ChatBoxProps = {};

export default function ChatBox(_props: ChatBoxProps) {
	const ws = useWs();

	const action = async (formData: FormData) => {
		ws?.send(formData.get("message") ?? "");
	};

	return (
		<Group>
			<form action={action}>
				<TextInput name="message" />
				<ActionIcon>
					<PaperPlaneIcon />
				</ActionIcon>
			</form>
		</Group>
	);
}
