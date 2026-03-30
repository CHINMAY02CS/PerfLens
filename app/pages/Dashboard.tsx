"use client";

import DescriptionCard from "@/components/elements/DescriptionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplet, Gauge, Globe, Loader, Package, Zap } from "lucide-react";
import { useAnalyze } from "../lib/hooks/useAnalyze";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {


  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-6 h-screen">
      <p className="text-7xl font-mono font-bold bg-gradient-to-r from-white to-sky-400 bg-clip-text text-transparent">
        PERFORMANCE LENS
      </p>
      <div className="flex flex-col items-center justify-center gap-4">
        <URLForm />
        <p className="text-white text-xs font-medium font-mono">Instant technical audit for modern web stacks.</p>
      </div>
      <div className="grid md:grid-cols-2 mt-32 lg:grid-cols-3 gap-4 lg:gap-8">
        <DescriptionCard icon={<Package className="text-purple-200" />} title="Bundle Analysis" description="Deep-dive into dependency trees and tree-shaking efficiency to eliminate dead code." />
        <DescriptionCard icon={<Gauge className="text-green-400" />} title="Render Perf" description="Atomic-level profiling of DOM mutations and layout thrashing across all viewports." />
        <DescriptionCard icon={<Droplet className="text-sky-500" />} title="Hydration Checks" description="Detect SSR/CSR mismatches and expensive re-hydration loops in your framework of choice." />
      </div>
    </div>
  )
}


const URLForm = () => {
  const { loading, error, setError, analyze } = useAnalyze();
  const [url, setUrl] = useState("");

  const router = useRouter();

  const handleAnalyze = async () => {
    const data = await analyze(url);
    if (data) {
      router.push(`/results?url=${encodeURIComponent(url)}`);
    }
  }
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center gap-2 text-slate-400 px-4 py-1 rounded-xl border border-slate-700/50">
        <div className="pointer-events-none absolute -inset-2 rounded-xl bg-blue-500/20 blur-xl opacity-60"></div>
        <Globe className="size-6 text-slate-400 relative z-10" />
        <Input
          value={url}
          onChange={(e) => { setUrl(e.target.value); setError("") }}
          className="relative z-10 h-12 w-sm border-none bg-transparent text-white placeholder:text-slate-400 font-medium outline-none focus-visible:ring-0"
          placeholder="https://example.com"
        />
        <Button disabled={loading || !url || (error !== "")} onClick={handleAnalyze} className="h-12"> <span className="font-bold"> ANALYZE</span> {loading ? <Loader className="ml-2 fill-blue-950 animate-spin" /> : <Zap className="ml-2 fill-blue-950" />} </Button>
      </form>
      {error && <span className="text-sm text-red-400">{error}</span>}
    </>
  )
}