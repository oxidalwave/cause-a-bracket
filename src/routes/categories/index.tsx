import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod/v4";
import createCategory from "~/server/category/createCategory";
import getCategories from "~/server/category/getCategories";

export const Route = createFileRoute("/categories/")({
  component: RouteComponent,
  loader: async () => ({ categories: await getCategories({ data: {} }) }),
});

function NewCategoryForm() {
  const navigate = Route.useNavigate();

  return (
    <form
      action={async (formData) => {
        const name = z.string().parse(formData.get("name"));
        const result = await createCategory({ data: { name } });
        const category = result[0];
        if (category === undefined) {
          throw new Error("Failed to create category");
        }
        navigate({
          to: "/categories/$id",
          params: { id: category.id },
        });
      }}
    >
      <Stack>
        <TextInput name="name" data-autofocus size="sm" />
        <Button type="submit">Create</Button>
      </Stack>
    </form>
  );
}

function RouteComponent() {
  const { categories } = Route.useLoaderData();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Stack>
      <Button onClick={open}>New Category</Button>
      <Modal opened={opened} onClose={close}>
        <NewCategoryForm />
      </Modal>
      {categories.map((c) => (
        <Link key={c.id} to="/categories/$id" params={{ id: c.id }}>
          {c.name}
        </Link>
      ))}
    </Stack>
  );
}
