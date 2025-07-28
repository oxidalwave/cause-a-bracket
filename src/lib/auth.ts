import { betterAuth } from "better-auth";
import { reactStartCookies } from "better-auth/react-start";
import { Pool } from "pg";

const discord =
  import.meta.env.VITE_BETTER_AUTH_DISCORD_CLIENT_ID &&
  import.meta.env.VITE_BETTER_AUTH_DISCORD_CLIENT_SECRET
    ? {
        clientId: import.meta.env.VITE_BETTER_AUTH_DISCORD_CLIENT_ID,
        clientSecret: import.meta.env.VITE_BETTER_AUTH_DISCORD_CLIENT_SECRET,
      }
    : undefined;

console.log(import.meta.env.VITE_BETTER_AUTH_TRUSTED_ORIGINS);

export const auth = betterAuth({
  database: new Pool({
    connectionString: import.meta.env.VITE_BETTER_AUTH_POSTGRES_URL,
  }),
  socialProviders: {
    discord,
  },
  plugins: [reactStartCookies()],
  trustedOrigins:
    import.meta.env.VITE_BETTER_AUTH_TRUSTED_ORIGINS?.split(",") ?? [],
});
