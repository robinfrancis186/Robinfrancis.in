import type { Metadata } from "next";
import { GalleryRoute } from "../_components/route-clients";

export const metadata: Metadata = {
  title: "Gallery | Robin Francis",
  description: "Explore a curated collection of moments, landscapes, and visual stories by Robin Francis.",
  alternates: {
    canonical: "/gallery/",
  },
};

export default function Page() {
  return <GalleryRoute />;
}
