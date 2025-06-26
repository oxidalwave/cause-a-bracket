import Valkey from "iovalkey";
import env from "../env";

const valkey = new Valkey({
	host: env.VITE_VALKEY_HOST,
	port: env.VITE_VALKEY_PORT,
	username: env.VITE_VALKEY_USERNAME,
	password: env.VITE_VALKEY_PASSWORD,
	db: env.VITE_VALKEY_DB,
});

export default valkey;
