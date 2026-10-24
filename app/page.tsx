import { Suspense } from "react";
import ConceptPage from "./concept-page";

export default function Page() {
  return (
    <Suspense fallback={<div role="status">Загрузка…</div>}>
      <ConceptPage />
    </Suspense>
  );
}
