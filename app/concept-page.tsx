"use client";

import { useSearchParams } from "next/navigation";
import Hub from "@/components/hub";

export default function ConceptPage() {
  const params = useSearchParams();
  return <Hub concept={params.get("concept") === "b" ? "b" : "a"} />;
}
