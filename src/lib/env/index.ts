import z from "zod";

const EnvironmentValidator = z.object({
  VITE_VALKEY_CONNECTION_STRING: z.string().url(),
  VITE_WS_PORT: z.coerce.number().default(5174),
});

const env = EnvironmentValidator.parse(import.meta.env);

export default env;
