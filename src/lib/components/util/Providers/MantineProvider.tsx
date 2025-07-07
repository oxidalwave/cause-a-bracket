import {
	createTheme,
	MantineProvider as MantineMantineProvider,
	type MantineProviderProps as MantineMantineProviderProps,
} from "@mantine/core";

const theme = createTheme({ primaryColor: "teal" });

export type MantineProviderProps = MantineMantineProviderProps;

export default function MantineProvider({
	children,
	...props
}: MantineProviderProps) {
	return (
		<MantineMantineProvider theme={theme} {...props}>
			{children}
		</MantineMantineProvider>
	);
}
