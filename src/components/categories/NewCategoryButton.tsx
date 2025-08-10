import {
  Button,
  type ButtonProps,
  type ElementProps,
  Modal,
  type ModalProps,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type React from "react";
import type { PropsWithChildren } from "react";
import { useCallback } from "react";
import { z } from "zod/v4";
import NewCategoryForm from "~/components/categories/NewCategoryForm";
import formAction from "~/lib/form/formAction";
import type { DeepPartial } from "~/lib/utils/DeepPartial";
import createCategory from "~/server/category/createCategory";

type NewCategoryButtonProps = PropsWithChildren<{
  onSuccess?: (category: { id: number }) => void;
  onError?: (error: Error) => void;
  slotProps?: DeepPartial<{
    button?: ButtonProps & ElementProps<"button">;
    modal?: ModalProps;
  }>;
}>;

export default function NewCategoryButton(props: NewCategoryButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      props.slotProps?.button?.onClick?.(e);
      open();
    },
    [open, props.slotProps?.button],
  );

  const handleModalClose = useCallback(() => {
    props.slotProps?.modal?.onClose?.();
    close();
  }, [close, props.slotProps?.modal]);

  return (
    <>
      <Button {...props.slotProps?.button} onClick={handleButtonClick}>
        {props.children}
      </Button>
      <Modal opened={opened} onClose={handleModalClose}>
        <NewCategoryForm
          action={formAction({
            schema: z.object({ name: z.string() }),
            action: async (data) => {
              const result = await createCategory({ data });
              const category = result[0];
              if (category === undefined) {
                props.onError?.(new Error("Failed to create category"));
              }
              props.onSuccess?.(category);
            },
          })}
        />
      </Modal>
    </>
  );
}
