import Valkey from "iovalkey";

const valkey = new Valkey(import.meta.env.VITE_REDIS_CONNECTION_STRING);

export default valkey;
