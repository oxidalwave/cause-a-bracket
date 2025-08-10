import { Box, Stack } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod/v4";
import getCategory from "~/server/category/getCategory";
import getCategoryEntries from "~/server/entry/getCategoryEntries";

export const Route = createFileRoute("/categories/$id")({
  component: RouteComponent,
  params: z.object({ id: z.coerce.number().int() }),
  loader: async ({ params: { id } }) => ({
    category: await getCategory({ data: { id } }),
    entries: await getCategoryEntries({ data: { category: { id } } }),
  }),
});

function RouteComponent() {
  const { category, entries } = Route.useLoaderData();

  return (
    <Stack>
      <Box>{category.name}</Box>
      {entries.map((e) => (
        <Stack key={e.id}>
          <Box>{e.name}</Box>
          {e.description !== undefined && <Box>{e.description}</Box>}
        </Stack>
      ))}
    </Stack>
  );
}
