import { createMiddleware } from "@tanstack/react-start";

const loggingMiddleware = createMiddleware({ type: "function" }).server(
  async (req) => {
    console.log(req);
    return await req.next();
  },
);

export default loggingMiddleware;
