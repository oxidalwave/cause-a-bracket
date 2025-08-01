import { betterAuth } from "better-auth";
import { reactStartCookies } from "better-auth/react-start";
import type { SocialProviders } from "better-auth/social-providers";
import { Pool } from "pg";

const discord: SocialProviders["discord"] | undefined =
  import.meta.env.VITE_BETTER_AUTH_DISCORD_CLIENT_ID &&
  import.meta.env.VITE_BETTER_AUTH_DISCORD_CLIENT_SECRET
    ? {
        clientId: import.meta.env.VITE_BETTER_AUTH_DISCORD_CLIENT_ID,
        clientSecret: import.meta.env.VITE_BETTER_AUTH_DISCORD_CLIENT_SECRET,
        redirectURI: import.meta.env.VITE_BETTER_AUTH_DISCORD_REDIRECT_URL,
      }
    : undefined;

export const auth = betterAuth({
  database: new Pool({
    connectionString: import.meta.env.VITE_BETTER_AUTH_POSTGRES_URL,
  }),
  socialProviders: {
    discord,
  },
  secret: import.meta.env.VITE_BETTER_AUTH_SECRET,
  plugins: [reactStartCookies()],
  trustedOrigins: import.meta.env.VITE_BETTER_AUTH_TRUSTED_ORIGINS?.split(
    ",",
  ) ?? [import.meta.env.VITE_BETTER_AUTH_BASE_URL],
});
