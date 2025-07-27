import z from "zod";

export const Meta = z.object({
  id: z.string(),
  timestamp: z.iso.datetime(),
  author: z.string(),
});

export type Meta = z.infer<typeof Meta>;

export const withMeta = (schema: z.ZodObject) => schema.extend({ meta: Meta });

export type WithMeta<T extends z.ZodObject> = T & { meta: Meta };
