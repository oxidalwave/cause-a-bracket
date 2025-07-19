import { createMiddleware } from "@tanstack/react-start";

export const loggerMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next, data }) => {
    const result = await next();
    console.log(data);
    return result;
  },
);
