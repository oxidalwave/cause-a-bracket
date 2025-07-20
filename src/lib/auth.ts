import { betterAuth } from "better-auth";
import { reactStartCookies } from "better-auth/react-start";
import { Pool } from "pg";

const discord =
  process.env.BETTER_AUTH_DISCORD_CLIENT_ID &&
  process.env.BETTER_AUTH_DISCORD_CLIENT_SECRET
    ? {
        clientId: process.env.BETTER_AUTH_DISCORD_CLIENT_ID,
        clientSecret: process.env.BETTER_AUTH_DISCORD_CLIENT_SECRET,
      }
    : undefined;

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.BETTER_AUTH_POSTGRES_URL,
  }),
  socialProviders: {
    discord,
  },
  plugins: [reactStartCookies()],
});
