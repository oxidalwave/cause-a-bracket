import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import * as schema from "~/db/schema";

const db = drizzle({
  client: new Pool({
    connectionString: import.meta.env.VITE_BETTER_AUTH_POSTGRES_URL,
  }),
  schema,
});

console.log("Migrating database...");
await migrate(db, { migrationsFolder: "./drizzle" })
  .then(() => console.log("Migration was successful"))
  .catch((e) => {
    console.error("An error occurred during migration: ", e);
  });

export default db;
