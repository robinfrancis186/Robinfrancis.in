import type { Metadata } from "next";
import { HomeRoute } from "./_components/route-clients";

export const metadata: Metadata = {
  title: "Robin Francis | AI Innovator & Community Leader",
  description:
    "Portfolio of Robin Francis — AI innovator, community leader, and 3× hackathon winner building accessible, people-centric technology and scalable digital solutions.",
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return <HomeRoute />;
}
