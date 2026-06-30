import type { Metadata } from "next";
import { CardRoute } from "../_components/route-clients";

export const metadata: Metadata = {
  title: "Robin Francis Card | AI Innovator & Community Leader",
  description:
    "Robin Francis is an AI innovator and community leader available for meaningful AI, product, accessibility, and community collaborations.",
  alternates: {
    canonical: "/card/",
  },
};

export default function Page() {
  return <CardRoute />;
}
