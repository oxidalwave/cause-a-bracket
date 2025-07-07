import type { PropsWithChildren } from "react";
import React, { use, useEffect, useState } from "react";

export const WsContext = React.createContext<WebSocket | null>(null);

export const useWs = () => use(WsContext);

export type WsProviderProps = PropsWithChildren;

export default function WsProvider(props: WsProviderProps) {
	const [client, setClient] = useState<WebSocket | null>(null);

	useEffect(() => {
		setClient(new WebSocket("ws://localhost:8080"));
	}, []);

	return <WsContext value={client}>{props.children}</WsContext>;
}
