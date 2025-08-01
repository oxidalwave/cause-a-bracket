import { createMiddleware } from "@tanstack/react-start";

export const authMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    return next();
    /*
    const request = getWebRequest();
    if (!request?.headers) {
      return next({ context: { session: null } } as const);
    }
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session) {
      return next({ context: { session: null } } as const);
    }
    return next({
      context: {
        session,
      },
    });
     */
  },
);
