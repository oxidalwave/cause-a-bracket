import type { PropsWithChildren } from "react";
import MantineProviders from "./MantineProvider";
import WsProvider from "./WsProvider";

type ProvidersProps = PropsWithChildren;

export default function Providers({ children }: ProvidersProps) {
	return (
		<MantineProviders>
			<WsProvider>{children}</WsProvider>
		</MantineProviders>
	);
}
