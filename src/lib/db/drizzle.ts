// Make sure to install the 'pg' package
import { drizzle } from 'drizzle-orm/node-postgres';
import pool from "~/lib/db/pool";

// You can specify any property from the node-postgres connection options
const db = drizzle({
    client: pool
});

export default db;
