import Valkey from "iovalkey";
import env from "~/lib/env";

const valkey = new Valkey(env.VALKEY_CONNECTION_STRING);

export default valkey;
