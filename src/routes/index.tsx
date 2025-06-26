import { faker } from "@faker-js/faker";
import { Stack } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import TsLink from "~/components/TsLink";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<Stack>
			<TsLink.Button
				to="/$id"
				params={{
					id: faker.string.uuid(),
				}}
			>
				Create a new Bracket
			</TsLink.Button>
		</Stack>
	);
}
