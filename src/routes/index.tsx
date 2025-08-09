import { Stack } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import TsLink from "~/components/TsLink";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <Stack>
      <TsLink.Button to="/categories">View Categories</TsLink.Button>
    </Stack>
  );
}
