import Valkey from "iovalkey";

const valkey = new Valkey(import.meta.env.VALKEY_CONNECTION_STRING);

export default valkey;
