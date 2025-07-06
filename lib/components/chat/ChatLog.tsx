import { useEffect } from "react";
import { useWs } from "../util/Providers/WsProvider";

type ChatLogProps = {};

export default function ChatLog(_props: ChatLogProps) {
	const ws = useWs();

	useEffect(() => {
		ws?.addEventListener("message", (m) => {
			console.log(m);
		});
	}, [ws]);

	return <></>;
}
