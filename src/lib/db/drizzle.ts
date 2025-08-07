import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import schema from "~/lib/db/schema";

const db = drizzle({
  client: new Pool({
    connectionString: import.meta.env.VITE_BETTER_AUTH_POSTGRES_URL,
  }),
  schema,
});

await migrate(db, { migrationsFolder: "./drizzle" });

export default db;
