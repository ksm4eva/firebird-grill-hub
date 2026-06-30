import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — FIREBIRD" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: () => <Outlet />,
});
