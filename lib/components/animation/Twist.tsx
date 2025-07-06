import { Box, type BoxProps } from "@mantine/core";
import type { PropsWithChildren } from "react";

import styles from "./Twist.module.css";

type TwistProps = PropsWithChildren<BoxProps>;

export default function Twist(props: TwistProps) {
	return <Box className={styles.twist} {...props} />;
}
