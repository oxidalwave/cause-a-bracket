import { Card, Flex } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import Twist from "~/lib/components/animation/Twist";
import TsLink from "~/lib/components/TsLink";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <Flex align="center" justify="center" h="100%">
      <Twist>
        <Card>
          <Card.Section>
            <TsLink.Button
              to="/brackets/$id"
              params={{
                id: "abcd",
              }}
              size="xl"
            >
              Cause a Bracket!
            </TsLink.Button>
          </Card.Section>
        </Card>
      </Twist>
    </Flex>
  );
}
