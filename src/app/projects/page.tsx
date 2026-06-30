import type { Metadata } from "next";
import { ProjectsRoute } from "../_components/route-clients";

export const metadata: Metadata = {
  title: "Projects | Robin Francis",
  description: "Explore AI, accessibility, product, and engineering projects built by Robin Francis.",
  alternates: {
    canonical: "/projects/",
  },
};

export default function Page() {
  return <ProjectsRoute />;
}
