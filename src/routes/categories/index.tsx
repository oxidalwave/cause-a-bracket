import { Stack } from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";
import NewCategoryButton from "~/components/categories/NewCategoryButton";
import getCategories from "~/server/category/getCategories";

export const Route = createFileRoute("/categories/")({
  component: RouteComponent,
  loader: async () => ({ categories: await getCategories({ data: {} }) }),
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { categories } = Route.useLoaderData();

  return (
    <Stack>
      <NewCategoryButton
        onSuccess={({ id }) => {
          navigate({
            to: "/categories/$id",
            params: { id },
          });
        }}
      >
        New Category
      </NewCategoryButton>
      {categories.map((c) => (
        <Link key={c.id} to="/categories/$id" params={{ id: c.id }}>
          {c.name}
        </Link>
      ))}
    </Stack>
  );
}
