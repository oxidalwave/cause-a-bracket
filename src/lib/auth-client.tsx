import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BETTER_AUTH_BASE_URL,
  redirectURL: import.meta.env.VITE_BETTER_AUTH_REDIRECT_URL ?? import.meta.env.VITE_BETTER_AUTH_BASE_URL,
  allowedRedirectURLs: [import.meta.env.VITE_BETTER_AUTH_REDIRECT_URL ?? import.meta.env.VITE_BETTER_AUTH_BASE_URL]
});

export default authClient;
