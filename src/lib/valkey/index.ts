import Valkey from "iovalkey";

const valkey = new Valkey(import.meta.env.VITE_VALKEY_CONNECTION_STRING);

export default valkey;
