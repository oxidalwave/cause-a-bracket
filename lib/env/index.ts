import z from "zod";

const EnvironmentValidator = z.object({
	VITE_VALKEY_CONNECTION_STRING: z.string().url(),
});

const env = EnvironmentValidator.parse(import.meta.env);

export default env;
