import {betterAuth} from "better-auth";
import {Pool} from "pg";
import {drizzleAdapter} from "better-auth/adapters/drizzle";

export const auth = betterAuth({
    secret: process.env.SERVICE_BASE64_BETTERAUTHSECRET,
    database: drizzleAdapter(new Pool({
        user: process.env.SERVICE_USER_POSTGRES ?? 'postgres',
        password: process.env.SERVICE_PASSWORD_POSTGRES,
        host: process.env.SERVICE_HOST_POSTGRES ?? 'localhost',
        port: Number(process.env.SERVICE_PORT_POSTGRES ?? '5432'),
        database: process.env.SERVICE_DATABASE_POSTGRES ?? process.env.SERVICE_USER_POSTGRES ?? 'postgres'
    }), { provider: "pg" }),
});
