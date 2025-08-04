import {Pool} from "pg";

const pool = new Pool({
    connectionString: import.meta.env.VITE_BETTER_AUTH_POSTGRES_URL,
});

export default pool;