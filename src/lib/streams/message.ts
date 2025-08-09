import type { z } from "zod/v4";

const decoder = new TextDecoder();

export const decode = <TSchema extends z.ZodType>(
  message: Uint8Array<ArrayBuffer>,
  schema: TSchema,
) => {
  const str = decoder.decode(message, { stream: true });
  let parsed: unknown;
  try {
    parsed = JSON.parse(str);
  } catch (_error) {
    throw new Error(`Failed to parse message: ${str}`);
  }
  const validated = schema.safeParse(parsed);
  if (!validated.success) {
    throw new Error(`Validation failed: ${validated.error.message}`);
  }
  return validated.data;
};
