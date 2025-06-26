import z from "zod";

const EnvironmentValidator = z.object({
	VITE_VALKEY_HOST: z.string(),
	VITE_VALKEY_PORT: z.coerce.number().int().min(0).max(65535).optional(),
	VITE_VALKEY_USERNAME: z.string().optional(),
	VITE_VALKEY_PASSWORD: z.string().optional(),
	VITE_VALKEY_DB: z.coerce.number().int().min(0).optional(),
});

const env = EnvironmentValidator.parse(import.meta.env);

export default env;
