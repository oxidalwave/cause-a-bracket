import type { z } from "zod/v4";

type FormActionProps<TData extends Record<string, string>> = {
  schema: z.ZodType<TData>;
  action: (data: TData) => void | Promise<void>;
};

const formAction =
  <TData extends Record<string, string>>({
    schema,
    action,
  }: FormActionProps<TData>) =>
  async (formData: FormData) => {
    const entries = formData.entries();
    const obj = Object.fromEntries(entries);
    const data = schema.parse(obj);
    await action(data);
  };

export default formAction;
