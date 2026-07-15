import { HomeViewport } from "@/components/home/home-viewport";
import { Seo } from "@/components/seo";

export function HomePage() {
  return (
    <>
      <Seo breadcrumbs={[{ label: "Home", href: "/" }]} />
      <HomeViewport />
    </>
  );
}
