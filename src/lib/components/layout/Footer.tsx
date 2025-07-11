import {
  AppShellFooter,
  type AppShellFooterProps,
  Box,
  Group,
} from "@mantine/core";
import type { PropsWithChildren } from "react";

type FooterProps = PropsWithChildren<AppShellFooterProps>;

export default function Footer(props: FooterProps) {
  return (
    <AppShellFooter {...props}>
      <Group justify="space-between" align="center" h="100%" p="xs">
        <Box></Box>
        <Box></Box>
        <Box></Box>
      </Group>
    </AppShellFooter>
  );
}
