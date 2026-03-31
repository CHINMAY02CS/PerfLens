"use client"
import { Lightbulb, Search } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
    return (
        <div className="fixed top-0 h-15 p-4 px-6 z-40 font-mono bg-slate-900 text-white flex items-center justify-between w-full">
            <div className="pointer-events-none absolute -inset-2 rounded-xl bg-blue-500/30 blur-xl opacity-60"></div>
            <span className="flex items-center gap-2 cursor-pointer" onClick={() => {
                if (window.location.pathname === "/") return
                window.location.href = "/"
            }}>
                <Search className="text-sky-400" />
                <span className="text-xl font-bold">PERFLENS</span>
            </span>
                 <Link href="/about" className="flex text-sm md:text-base font-medium"><Lightbulb className="text-sky-400 scale-90 mr-1" /> ABOUT</Link>
        </div>
    )
}
