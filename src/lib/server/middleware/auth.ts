import { createMiddleware } from "@tanstack/react-start";
import { getHeaders } from "@tanstack/react-start/server";
import authClient from "~/lib/auth-client";

export const authMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const { data: session } = await authClient.getSession({
      fetchOptions: {
        headers: getHeaders() as HeadersInit,
      },
    });
    return await next({
      context: {
        session,
      },
    });
  },
);
