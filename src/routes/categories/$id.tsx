import { Box, Stack } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod/v4";
import type { EntryDto } from "~/lib/dto/entry";
import getCategory from "~/server/category/getCategory";

export const Route = createFileRoute("/categories/$id")({
  component: RouteComponent,
  params: z.object({ id: z.coerce.number().int() }),
  loader: async ({ params: { id } }) => ({
    category: await getCategory({ data: { id } }),
    entries: [] as EntryDto[],
  }),
});

function RouteComponent() {
  const { category, entries } = Route.useLoaderData();

  return (
    <Stack>
      <Box>{category.name}</Box>
      {entries.map((e) => (
        <Box key={e.id}>{e.name}</Box>
      ))}
    </Stack>
  );
}
