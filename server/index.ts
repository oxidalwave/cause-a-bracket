import { WebSocketServer } from "ws";
import { Message } from "~lib/validators/chat/Message";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
	ws.on("error", console.error);

	ws.on("message", function message(data) {
		const message = Message.omit({ id: true, timestamp: true }).parse(
			JSON.parse(String(data)),
		);
		wss.clients.forEach((c) => {
			if (c !== ws && c.readyState === WebSocket.OPEN) {
				c.send(
					JSON.stringify({
						...message,
						id: crypto.randomUUID(),
						timestamp: new Date(),
					}),
				);
			}
		});
	});
});
