import { Box, type BoxProps } from "@mantine/core";
import type { PropsWithChildren } from "react";

type TwistProps = PropsWithChildren<BoxProps>;

export default function Twist(props: TwistProps) {
	return (
		<Box
			className="transition-transform duration-300 hover:rotate-[15deg] hover:scale-110"
			{...props}
		/>
	);
}
