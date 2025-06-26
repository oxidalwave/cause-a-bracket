import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({ primaryColor: "teal" });

export default function Providers({ children }: { children: React.ReactNode }) {
	return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
