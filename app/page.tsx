import Hub from "@/components/hub";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ concept?: string }>;
}) {
  const params = await searchParams;
  return <Hub concept={params.concept === "b" ? "b" : "a"} />;
}
