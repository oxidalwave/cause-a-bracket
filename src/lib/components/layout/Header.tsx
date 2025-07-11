import {
  AppShellHeader,
  type AppShellHeaderProps,
  Center,
  Flex,
  Grid,
} from "@mantine/core";

type HeaderProps = AppShellHeaderProps & {
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
};

export default function Header({
  leftSection,
  children,
  rightSection,
  ...props
}: HeaderProps) {
  return (
    <AppShellHeader {...props}>
      <Grid h="100%" p="xs">
        <Grid.Col span={4}>{leftSection}</Grid.Col>
        <Grid.Col span={4}>
          <Center>{children}</Center>
        </Grid.Col>
        <Grid.Col span={4}>
          <Flex justify="flex-end">{rightSection}</Flex>
        </Grid.Col>
      </Grid>
    </AppShellHeader>
  );
}
