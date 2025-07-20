import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: process.env.URL,
  redirectTo: "/",
});

export default authClient;
