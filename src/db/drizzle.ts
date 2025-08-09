import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "~/db/schema";

const db = drizzle({
  client: new Pool({
    connectionString: import.meta.env.VITE_BETTER_AUTH_POSTGRES_URL,
  }),
  schema,
});

export default db;
