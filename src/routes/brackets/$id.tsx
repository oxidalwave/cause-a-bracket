import {
  Button,
  Card,
  Center,
  Grid,
  Group,
  Stack,
  TextInput,
  type TextInputProps,
  Title,
} from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import EntrantCard from "~/lib/components/entrant/EntrantCard";
import valkey from "~/lib/valkey";
import { z } from "zod";

const getBracketData = createServerFn({ method: "GET", response: "data" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => await valkey.hgetall(`bracket-${data.id}`));

const setBracketData = createServerFn({ method: "POST", response: "data" })
  .validator(
    z.object({ id: z.string(), data: z.record(z.string(), z.string()) }),
  )
  .handler(async ({ data }) =>
    Object.entries(data.data).forEach(([key, value]) =>
      valkey.hset(`bracket-${data.id}`, key, value),
    ),
  );

const getBracketEntrants = createServerFn({ method: "GET", response: "data" })
  .validator(z.object({ id: z.string() }))
  .handler(
    async ({ data }) => await valkey.lrange(`entrants-${data.id}`, 0, -1),
  );

const addEntrantToBracket = createServerFn({ method: "POST", response: "data" })
  .validator(z.object({ id: z.string(), item: z.string() }))
  .handler(
    async ({ data }) => await valkey.rpush(`entrants-${data.id}`, data.item),
  );

export const Route = createFileRoute("/brackets/$id")({
  component: Home,
  params: z.object({ id: z.string() }),
  loader: async ({ params }) => ({
    data: await getBracketData({ data: params }),
    brackets: await getBracketEntrants({ data: params }),
  }),
});

function Home() {
  const { brackets, data } = Route.useLoaderData();
  const { id } = Route.useParams();
  const navigate = Route.useNavigate();

  const [category, setCategory] = useState(data.name ?? "");

  const handleChangeCategory: TextInputProps["onChange"] = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  const handleBlurCategory: TextInputProps["onBlur"] = (e) => {
    e.preventDefault();
    setBracketData({ data: { id, data: { name: e.target.value } } });
  };

  return (
    <Stack>
      <TextInput
        value={category}
        onChange={handleChangeCategory}
        onBlur={handleBlurCategory}
        size="xl"
      />
      <Center>
        <Group>
          <Card withBorder padding="md">
            <form
              action={async (formData) => {
                await addEntrantToBracket({
                  data: { id, item: formData.get("item") as string },
                });
                navigate({ to: "/brackets/$id", params: { id } });
              }}
            >
              <Stack>
                <Title order={4}>Add an Entrant</Title>
                <TextInput name="item" />
                <Button type="submit">Submit</Button>
              </Stack>
            </form>
          </Card>
        </Group>
      </Center>
      <Title order={3}>Entrants</Title>
      <Grid>
        {brackets.map((b: string) => (
          <Grid.Col key={b} span={2}>
            <EntrantCard entrant={b} />
          </Grid.Col>
        ))}
      </Grid>
      <Button>Enter Bracket</Button>
    </Stack>
  );
}
