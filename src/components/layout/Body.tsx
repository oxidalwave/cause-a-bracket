import { AppShellMain, type FlexProps } from "@mantine/core";
import type { PropsWithChildren } from "react";

type BodyProps = PropsWithChildren<FlexProps>;

export default function Body({ children }: BodyProps) {
	return <AppShellMain h="100dvh">{children}</AppShellMain>;
}
