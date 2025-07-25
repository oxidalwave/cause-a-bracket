import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  redirectTo: "/",
});

export default authClient;
