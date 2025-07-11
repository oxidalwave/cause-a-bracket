import {
  createTheme,
  MantineProvider,
  type MantineThemeOverride,
} from "@mantine/core";
import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren, useMemo, useState } from "react";

type ProvidersProps = PropsWithChildren<{
  queryClient: QueryClient;
}>;

export default function Providers({ children, queryClient }: ProvidersProps) {
  const [themeOverrides] = useState<MantineThemeOverride>({
    primaryColor: "teal",
  });
  const theme = useMemo(() => createTheme(themeOverrides), [themeOverrides]);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </QueryClientProvider>
  );
}
