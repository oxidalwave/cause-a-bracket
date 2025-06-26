import { Box, Button, Card, Group, Stack, TextInput } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import valkey from "~/lib/db/valkey";

const getBracket = createServerFn({ method: "GET", response: "data" })
	.validator(z.object({ id: z.string() }))
	.handler(async ({ data }) => await valkey.lrange(data.id, 0, -1));

const addToBracket = createServerFn({ method: "POST", response: "data" })
	.validator(z.object({ id: z.string(), item: z.string() }))
	.handler(async ({ data }) => await valkey.rpush(data.id, data.item));

export const Route = createFileRoute("/brackets/$id")({
	component: Home,
	params: z.object({ id: z.string() }),
	loader: async ({ params }) => ({
		brackets: await getBracket({ data: params }),
	}),
});

function Home() {
	const { brackets } = Route.useLoaderData();
	const { id } = Route.useParams();
	const navigate = Route.useNavigate();

	return (
		<Stack>
			<Group>
				<Card withBorder>
					<Card.Section>
						<form
							action={async (formData) => {
								await addToBracket({
									data: { id, item: formData.get("item") as string },
								});
								navigate({ to: "/brackets/$id", params: { id } });
							}}
						>
							<Stack>
								<TextInput name="item" />
								<Button type="submit">Submit</Button>
							</Stack>
						</form>
					</Card.Section>
				</Card>
			</Group>
			<Stack>
				{brackets.map((b: string) => (
					<Box key={b}>{b}</Box>
				))}
			</Stack>
		</Stack>
	);
}
