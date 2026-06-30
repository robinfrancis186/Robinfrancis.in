import type { Metadata } from "next";
import { BlogRoute } from "../_components/route-clients";

export const metadata: Metadata = {
  title: "Blog | Robin Francis",
  description:
    "Insights on AI engineering, accessible technology, product building, and community leadership by Robin Francis.",
  alternates: {
    canonical: "/blog/",
  },
};

export default function Page() {
  return <BlogRoute />;
}
