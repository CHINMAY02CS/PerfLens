import { Card } from "../ui/card";

export default function DescriptionCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <Card className="m-0 p-4 max-w-96 font-mono rounded-sm bg-slate-800 text-slate-50 font-medium flex flex-col items-start gap-4">
                <div className="p-2 rounded-sm bg-slate-700 font-thin">{icon}</div>
                <p className="text-sm font-bold">{title}</p>
            <p className="text-sm text-slate-400">{description}</p>
        </Card>
    )
}
