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
    // connection options
    host: process.env.BETTER_AUTH_POSTGRES_HOST,
    user: process.env.BETTER_AUTH_POSTGRES_USER,
    password: process.env.BETTER_AUTH_POSTGRES_PASSWORD,
    database: process.env.BETTER_AUTH_POSTGRES_DB,
  }),
  socialProviders: {
    discord,
  },
  plugins: [reactStartCookies()],
});
