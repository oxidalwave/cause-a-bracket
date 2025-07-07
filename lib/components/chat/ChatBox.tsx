import { ActionIcon, TextInput } from "@mantine/core";
import { PaperPlaneIcon } from "@phosphor-icons/react";

type ChatBoxProps = {
	disabled?: boolean;
	action: (formData: FormData) => Promise<void>;
};

export default function ChatForm({ action, disabled }: ChatBoxProps) {
	return (
		<form action={action}>
			<TextInput
				disabled={disabled}
				style={{ flexGrow: 1 }}
				size="sm"
				name="message"
				rightSection={
					<ActionIcon type="submit" size="input-sm" variant="subtle">
						<PaperPlaneIcon />
					</ActionIcon>
				}
			/>
		</form>
	);
}
