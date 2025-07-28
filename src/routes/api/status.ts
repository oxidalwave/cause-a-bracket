import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/status").methods({
  GET: () => new Response("OK"),
});
