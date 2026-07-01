import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DiamondLayout } from "@/components/diamond/DiamondShell";
import { DiamondProvider } from "@/lib/diamondStore";

export const Route = createFileRoute("/diamond")({
  head: () => ({
    meta: [
      { title: "Diamond City — Luxury Living Beyond Expectations" },
      { name: "description", content: "Diamond City offers private luxury apartment residences in Ghana with world-class amenities, crystal pools, and landscaped gardens." },
      { property: "og:title", content: "Diamond City — Luxury Living Beyond Expectations" },
      { property: "og:description", content: "Private luxury apartment residences in Ghana." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => (
    <DiamondProvider>
      <DiamondLayout>
        <Outlet />
      </DiamondLayout>
    </DiamondProvider>
  ),
});
