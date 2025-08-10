import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { auth } from "~/lib/auth";

const authMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const request = getWebRequest();
    if (!request?.headers) {
      throw new Error("No headers were found");
    }
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session) {
      throw new Error("No session was found");
    }
    return await next({ context: { session } });
  },
);

export default authMiddleware;
