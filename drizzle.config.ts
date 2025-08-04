import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: `postgres://${process.env.SERVICE_USER_POSTGRES ?? 'postgres'}:${process.env.SERVICE_PASSWORD_POSTGRES}@${process.env.SERVICE_HOST_POSTGRES ?? 'localhost'}:${process.env.SERVICE_PORT_POSTGRES ?? '5432'}/${process.env.SERVICE_DATABASE_POSTGRES ?? process.env.SERVICE_USER_POSTGRES ?? 'postgres'}`,
  }
});
