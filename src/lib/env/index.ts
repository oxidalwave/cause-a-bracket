import z from "zod";

const EnvironmentValidator = z.object({
  VALKEY_CONNECTION_STRING: z.url(),
});

const env = EnvironmentValidator.parse(import.meta.env);

export default env;
