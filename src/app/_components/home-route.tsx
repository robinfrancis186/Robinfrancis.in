"use client";

import Home from "@/views/Home";
import type { ReactNode } from "react";

export function HomeRoute({ children }: { children: ReactNode }) {
  return <Home>{children}</Home>;
}
