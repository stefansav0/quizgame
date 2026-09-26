
import { Suspense } from "react";
import NHIEExperience from "./NHIEExperience";

export const metadata = {
  title: "Never Have I Ever | GetKnowify",
  description:
    "Create and share a Never Have I Ever challenge with your friends.",
};

function NHIELoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="text-center">
        <div
          className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-purple-400"
          aria-hidden="true"
        />
        <p className="font-medium text-slate-300">
          Loading Never Have I Ever...
        </p>
      </div>
    </main>
  );
}

export default function NHIEPage() {
  return (
    <Suspense fallback={<NHIELoading />}>
      <NHIEExperience />
    </Suspense>
  );
}