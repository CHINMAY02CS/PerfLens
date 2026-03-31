"use client"

import { useSearchParams } from "next/navigation"
import { useAnalyze } from "../lib/hooks/useAnalyze"
import { useEffect, useMemo } from "react"
import { Calendar, Info, Loader } from "lucide-react"
import { format } from "date-fns"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import TooltipWrap from "@/components/elements/TooltipWrap"

export default function Results() {
    const searchParams = useSearchParams()
    const { loading, error, analyze, data } = useAnalyze()

    useEffect(() => {
        const url = searchParams.get("url")
        if (url) analyze(url)
    }, [searchParams])

    const metrics = useMemo(() => {
        if (!data) return null
        const audits = data.lighthouseResult.audits

        return {
            score: Math.round(data.lighthouseResult.categories.performance.score * 100),
            lcp: audits["largest-contentful-paint"]?.numericValue || 0,
            fcp: audits["first-contentful-paint"]?.numericValue || 0,
            cls: audits["cumulative-layout-shift"]?.numericValue || 0,
            tbt: audits["total-blocking-time"]?.numericValue || 0,
            ttfb: data.loadingExperience?.metrics?.EXPERIMENTAL_TIME_TO_FIRST_BYTE?.percentile || 0,
            unusedJS: audits["unused-javascript"]?.details?.overallSavingsBytes || 0,
            domSize: audits["dom-size-insight"]?.numericValue || 0,
        }
    }, [data])


    const suggestions = useMemo(() => {
        if (!metrics) return []
        const s = []
        if (metrics.lcp > 2500) {
            s.push("Improve LCP: optimize images or use server-side rendering")
        }
        if (metrics.unusedJS > 150000) {
            s.push("Reduce unused JavaScript (use code splitting / remove heavy libs)")
        }
        if (metrics.domSize > 1500) {
            s.push("Large DOM size: reduce unnecessary nested elements")
        }
        return s
    }, [metrics])

    if (loading) return (
        <div className="text-white p-6 flex justify-center">
            <Loader className="animate-spin size-10 text-slate-400 mt-20" />
        </div>
    )

    if (error) return (
        <div className="text-white p-6 flex justify-center">
            <p className="text-red-500 mt-20">{error}</p>
        </div>
    )

    if (!metrics) return (
        <div className="text-white p-6 flex justify-center">
            <p className="text-slate-400 mt-20">No data</p>
        </div>
    )

    return (
        <div className="text-white p-6 flex justify-center">
            <div className="w-full max-w-6xl flex flex-col gap-8">
                <Heading />
                <PerformanceInsight metrics={metrics} suggestions={suggestions} />
                <Metrics metrics={metrics} />
            </div>
        </div>
    )

}

function Heading() {
    const searchParams = useSearchParams()
    return (
        <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex flex-col gap-2">
                <p className="text-4xl font-mono font-bold bg-gradient-to-r from-white to-sky-400 bg-clip-text text-transparent">
                    RESULT ANALYSIS
                </p>
                <span className="text-slate-400 break-all">
                    URL : <span className="text-white">{searchParams.get("url")}</span>
                </span>
                <span className="flex items-center gap-2 text-slate-400">
                    <Calendar className="size-5" /> Report generated on {format(new Date(), "PPP")}
                </span>
            </div>
            <Link href="/" className="text-lg font-medium whitespace-nowrap"> ← Back</Link>
        </div>
    )
}

function PerformanceInsight({ metrics, suggestions }: {
    metrics: any,
    suggestions: string[]
}) {
    return (
        <div className="grid font-mono lg:grid-cols-3 gap-4">
            <Card className="m-0 p-4 md:p-8 lg:p-16 lg:col-span-2 lg:flex-row font-mono rounded-sm bg-slate-800 text-slate-50 font-medium flex flex-col items-start gap-4 md:gap-8 lg:gap-16">
                <RadialScore score={metrics.score} />
                <div className="flex flex-col gap-2">
                    <span className="text-xl md:text-2xl text-slate-400" >Performance Insight</span>
                    <p className="text-slate-400 text-sm">
                        {metrics.lcp > 2500
                            ? "Your app is experiencing slow load times. Large content rendering is the main bottleneck."
                            : "Your app is performing well with optimized rendering and fast load times."}
                    </p>
                </div>
            </Card>
            <Card className="m-0 p-4 md:p-8 lg:flex-row font-mono rounded-sm bg-slate-800 text-slate-50 font-medium flex flex-col items-start gap-4 md:gap-8 lg:gap-16">
                <div className="flex flex-col gap-2">
                    <span className="text-xl md:text-2xl text-slate-400" >Top Fixes</span>
                    <div className="text-slate-400 text-sm">
                        <ul className="flex flex-col gap-4 text-sm text-slate-300">
                            {suggestions.map((s, i) => (
                                <li key={i} className="flex justify-between gap-2">
                                    <span>→</span>
                                    <span>{s}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    )
}

function Metrics({ metrics }: { metrics: any }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <MetricCard title="Bundle Size"
                value={`${(metrics.unusedJS / 1024).toFixed(0)} KB`}
                description='Reduce unused JavaScript (use code splitting / remove heavy libs)'
                status="critical" />

            <MetricCard title="FCP"
                value={`${(metrics.fcp / 1000).toFixed(1)}s`}
                contentTitle='First Contentful Paint'
                description='Time it takes for the first bit of content to appear on the screen'
                status={metrics.fcp < 1800 ? "good" : "warning"} />

            <MetricCard title="LCP"
                value={`${(metrics.lcp / 1000).toFixed(1)}s`}
                contentTitle='Largest Contentful Paint'
                description='Time it takes for the largest bit of content to appear on the screen'
                status={metrics.lcp < 2500 ? "good" : metrics.lcp < 4000 ? "warning" : "critical"} />

            <MetricCard title="TTFB"
                value={`${(metrics.ttfb).toFixed(3)}ms`}
                contentTitle='Time to First Byte'
                description='Time it takes for the first bit of content to appear on the screen'
                status={metrics.ttfb < 200 ? "good" : "warning"} />

            <MetricCard title="TBT"
                value={`${(metrics.tbt).toFixed(3)}ms`}
                contentTitle='Total Blocking Time'
                description='Time it takes for the first bit of content to appear on the screen'
                status={metrics.tbt < 200 ? "good" : "warning"} />

        </div>
    )
}

function MetricCard({ title, value, status, contentTitle, description }: any) {
    const borderColor =
        status === "good"
            ? "border-b-green-300"
            : status === "warning"
                ? "border-b-yellow-400"
                : "border-b-red-400";

    return (
        <Card className={`bg-slate-700 font-mono rounded-xl py-2 px-4 md:py-4 flex flex-col gap-2 border-b-4 ${borderColor}`}>
            <div className="flex items-center justify-between">
                <p className="text-slate-100 text-sm">{title}</p>
                <TooltipWrap content={
                    <span className="flex flex-col gap-2">
                        {contentTitle && <span className="text-sm font-medium">{contentTitle}</span>}
                        <span>{description}</span>
                    </span>}>
                    <Info className="size-5 text-slate-400" />
                </TooltipWrap>
            </div>
            <p className="text-slate-100 text-xl">{value}</p>
        </Card>
    )
}
function RadialScore({ score }: { score: number }) {
    const getColor = () => {
        if (score >= 90) return "#4ade80"
        if (score >= 50) return "#facc15"
        return "#f87171"
    }

    const getLabel = () => {
        if (score >= 90) return "GOOD"
        if (score >= 50) return "NEEDS IMPROVEMENT"
        return "POOR"
    }

    const color = getColor()

    return (
        <div className="mx-auto flex flex-col items-center">
            <div
                className="w-32 h-32 md:w-48 md:h-48 flex items-center justify-center rounded-full"
                style={{
                    background: `
            radial-gradient(closest-side, #0b1326 79%, transparent 80% 100%),
            conic-gradient(${color} ${score}%, #2d3449 0)
          `,
                }}
            >
                <div className="text-center">
                    <span className="text-5xl font-black font-mono leading-none">
                        {score}
                    </span>
                    <p className="text-[10px] uppercase tracking-widest mt-1 font-bold"
                        style={{ color }}>
                        {getLabel()}
                    </p>
                </div>
            </div>
        </div>
    )
}