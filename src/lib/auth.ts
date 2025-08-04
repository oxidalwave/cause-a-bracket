import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";
import type { SocialProviders } from "better-auth/social-providers";
import db from "~/lib/db/drizzle";
import schema from "~/lib/db/schema";

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
  database: drizzleAdapter(db, { provider: "pg", schema }),
  socialProviders: {
    discord,
  },
  secret: import.meta.env.VITE_BETTER_AUTH_SECRET,
  plugins: [reactStartCookies()],
  trustedOrigins: import.meta.env.VITE_BETTER_AUTH_TRUSTED_ORIGINS?.split(
    ",",
  ) ?? [import.meta.env.VITE_BETTER_AUTH_BASE_URL],
});
