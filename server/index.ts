import dayjs from "dayjs";
import { WebSocketServer } from "ws";
import { CabServerEvent } from "~lib/validators/events";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
	ws.on("error", console.error);

	ws.on("message", function message(data) {
		const str = JSON.parse(String(data));
		const message = CabServerEvent.parse(str);
		switch (message.kind) {
			case "message": {
				const outgoingMessage = {
					...message,
					meta: {
						id: crypto.randomUUID(),
						timestamp: dayjs().unix(),
					},
				};
				wss.clients.forEach((c) => {
					if (c !== ws && c.readyState === WebSocket.OPEN) {
						c.send(JSON.stringify(outgoingMessage));
					}
				});
				break;
			}
			default:
		}
	});
});
