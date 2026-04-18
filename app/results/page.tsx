import { Suspense } from "react";
import ResultsClient from "./ResultsClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading...</div>}>
      <ResultsClient />
    </Suspense>
  );
}
