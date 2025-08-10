import { ActionIcon, TextInput } from "@mantine/core";
import { PaperPlaneIcon } from "@phosphor-icons/react";
import type { FormHTMLAttributes } from "react";
import { z } from "zod/v4";
import formAction from "~/lib/form/formAction";

type ChatBoxFormData = {
  message: string;
};

type ChatBoxProps = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "action" | "children"
> & {
  disabled?: boolean;
  action: (formData: ChatBoxFormData) => Promise<void>;
};

export default function ChatForm({ action, disabled, ...props }: ChatBoxProps) {
  return (
    <form
      {...props}
      action={formAction({
        schema: z.object({ message: z.string() }),
        action,
      })}
    >
      <TextInput
        data-autofocus
        disabled={disabled}
        style={{ flexGrow: 1 }}
        size="sm"
        name="message"
        rightSection={
          <ActionIcon type="submit" size="input-sm" variant="subtle">
            <PaperPlaneIcon />
          </ActionIcon>
        }
      />
    </form>
  );
}
