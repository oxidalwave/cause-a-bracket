import { Card, type CardProps } from "@mantine/core";
import type { Entrant } from "~/validators/entrant";

type EntrantCardProps = Omit<CardProps, "children"> & {
  entrant: Entrant;
};

export default function EntrantCard({ entrant, ...props }: EntrantCardProps) {
  return (
    <Card withBorder padding="md" {...props}>
      {entrant}
    </Card>
  );
}
