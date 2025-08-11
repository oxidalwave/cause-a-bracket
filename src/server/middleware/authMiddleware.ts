import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { auth } from "~/lib/auth";

const authMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const { headers } = getWebRequest();
    const session = await auth.api.getSession({
      headers,
    });
    if (!session) {
      throw new Error("No session was found");
    }
    return await next({ context: { session } });
  },
);

export default authMiddleware;
