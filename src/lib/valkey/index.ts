import Valkey from "iovalkey";
import env from "~/lib/env";

const valkey = new Valkey(env.VITE_VALKEY_CONNECTION_STRING);

export default valkey;
