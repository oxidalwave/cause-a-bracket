import type { z } from "zod/v4";

const encoder = new TextEncoder();

export const sendMessage = <TMessage>(
  controller: ReadableStreamDefaultController,
  message: TMessage,
) => {
  const stringified = JSON.stringify(message);
  const encoded = encoder.encode(stringified);
  controller.enqueue(encoded);
};

export const encode = <TMessage>(message: TMessage): Uint8Array =>
  encoder.encode(JSON.stringify(message));

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
