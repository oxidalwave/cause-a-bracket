import { Button, Stack, TextInput } from "@mantine/core";
import type { FormHTMLAttributes } from "react";

type NewCategoryFormProps = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "children"
>;

export default function NewCategoryForm(props: NewCategoryFormProps) {
  return (
    <form {...props}>
      <Stack>
        <TextInput name="name" data-autofocus size="sm" />
        <Button type="submit">Create</Button>
      </Stack>
    </form>
  );
}
