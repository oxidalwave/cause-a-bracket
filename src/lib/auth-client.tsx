import { createAuthClient } from "better-auth/react";

const redirectURL =
  import.meta.env.VITE_BETTER_AUTH_REDIRECT_URL ??
  import.meta.env.VITE_BETTER_AUTH_BASE_URL;

const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BETTER_AUTH_BASE_URL,
  redirectURL,
  allowedRedirectURLs: [redirectURL],
});

export default authClient;
