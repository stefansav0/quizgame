
"use client";

import Link from "next/link";
import NHIECreator from "@/components/nhie/NHIECreator";

export default function NHIECreatorPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 pt-6">
        <Link
          href="/nhie"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
        >
          <span aria-hidden="true">←</span>
          About Never Have I Ever
        </Link>
      </div>

      <NHIECreator />
    </main>
  );
}