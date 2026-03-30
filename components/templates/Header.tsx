import { Search } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
    return (
        <div className="fixed top-0 h-15 p-4 z-40 font-mono bg-slate-900 text-white flex items-center justify-between w-full">
            <div className="pointer-events-none absolute -inset-2 rounded-xl bg-blue-500/30 blur-xl opacity-60"></div>
            <span className="flex items-center gap-2">
                <Search className="text-sky-400" />
                <span className="text-xl font-bold">PERFLENS</span>
            </span>
            <div className="flex items-center gap-4 lg:gap-8">
                <Link href="/about" className="text-sm font-medium">About</Link>
                <Link href="/contact" className="text-sm font-medium">Contact</Link>
            </div>
        </div>
    )
}
