import { ActionIcon, TextInput } from "@mantine/core";
import { UserIcon } from "@phosphor-icons/react";

type LoggedOutChatProps = {
	onUserChange: (user: string) => void;
};

export default function LoggedOutChat({
	onUserChange: onSetUser,
}: LoggedOutChatProps) {
	const action = async (formData: FormData) => {
		const user = formData.get("user") ?? "";
		onSetUser(String(user));
	};

	return (
		<>
			<form action={action}>
				<TextInput
					style={{ flexGrow: 1 }}
					size="sm"
					name="user"
					rightSection={
						<ActionIcon type="submit" size="input-sm" variant="subtle">
							<UserIcon />
						</ActionIcon>
					}
				/>
			</form>
		</>
	);
}
