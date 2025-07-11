import type { PropsWithChildren } from "react";
import React, { use, useEffect, useState } from "react";
import env from "~/lib/env";

export const WsContext = React.createContext<WebSocket | undefined>(undefined);

export const useWs = () => use(WsContext);

export type WsProviderProps = PropsWithChildren;

export default function WsProvider({ children }: WsProviderProps) {
  const [ws, setWs] = useState<WebSocket | undefined>(undefined);

  useEffect(() => {
    setWs(
      new WebSocket(`ws://${window.location.hostname}:${env.VITE_WS_PORT}`),
    );
  }, []);

  return <WsContext value={ws}>{children}</WsContext>;
}
