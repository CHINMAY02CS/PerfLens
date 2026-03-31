"use client"

import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-mono px-6 py-10 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-10">
        <Link href="/" className="text-slate-400 hover:text-white transition ml-auto whitespace-nowrap">
          ← Back
        </Link>
        <section className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-sky-400 bg-clip-text text-transparent">
            About PerfLens
          </h1>
          <p className="text-slate-400 leading-relaxed">
            PerfLens is a frontend performance analyzer that helps developers understand how their websites perform and how to improve them.
          </p>
          <p className="text-slate-400 leading-relaxed">
            It uses real performance data and transforms it into clear, actionable insights — so you can fix issues faster without digging through complex reports.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Why Performance Matters</h2>
          <p className="text-slate-400">
            A fast website is critical for user experience and business success.
          </p>
          <ul className="list-disc list-inside text-slate-400 space-y-1">
            <li>Faster load times improve user engagement</li>
            <li>Better performance boosts SEO rankings</li>
            <li>Reduced delays increase conversions</li>
          </ul>
          <p className="text-slate-400">
            Even small improvements in performance can have a big impact.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">How Performance is Measured</h2>

          <Metric
            title="LCP (Largest Contentful Paint)"
            desc="Time taken to load the main content of the page."
            extra="Good: under 2.5 seconds"
          />

          <Metric
            title="FCP (First Contentful Paint)"
            desc="When the first visible content appears on the screen."
          />

          <Metric
            title="CLS (Cumulative Layout Shift)"
            desc="Measures visual stability. High CLS means elements move unexpectedly."
          />

          <Metric
            title="TBT (Total Blocking Time)"
            desc="Indicates how much JavaScript blocks the main thread. This often reflects hydration and heavy script execution."
          />

          <Metric
            title="TTFB (Time to First Byte)"
            desc="Time taken by the server to respond. Helps identify backend or network delays."
          />
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">How PerfLens Works</h2>
          <p className="text-slate-400">
            PerfLens uses performance data from PageSpeed Insights and applies custom logic to:
          </p>
          <ul className="list-disc list-inside text-slate-400 space-y-1">
            <li>Extract meaningful metrics</li>
            <li>Identify bottlenecks</li>
            <li>Generate actionable suggestions</li>
          </ul>
          <p className="text-slate-400">
            Instead of showing raw data, it focuses on what actually matters and how to fix it.
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">What Makes It Different</h2>
          <ul className="list-disc list-inside text-slate-400 space-y-1">
            <li>Clean and simplified performance insights</li>
            <li>Developer-focused suggestions</li>
            <li>Focus on real-world impact, not just numbers</li>
          </ul>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">What’s Next</h2>
          <ul className="list-disc list-inside text-slate-400 space-y-1">
            <li>Chrome extension for real-time analysis</li>
            <li>Historical performance tracking</li>
            <li>Advanced diagnostics and comparisons</li>
          </ul>
        </section>

        {/* Footer */}
        <p className="text-sm text-slate-500 mt-6">
          Built with a focus on clarity, performance, and developer experience.
        </p>
      </div>
    </div>
  )
}

// 🧩 Reusable Metric Component
function Metric({
  title,
  desc,
  extra,
}: {
  title: string
  desc: string
  extra?: string
}) {
  return (
    <div className="bg-slate-900 rounded-xl p-4 flex flex-col gap-1">
      <p className="font-semibold">{title}</p>
      <p className="text-slate-400 text-sm">{desc}</p>
      {extra && <p className="text-green-400 text-sm">{extra}</p>}
    </div>
  )
}