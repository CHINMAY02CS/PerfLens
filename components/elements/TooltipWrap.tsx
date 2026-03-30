import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ReactNode } from "react"

export default function TooltipWrap({ children, content }: { children: React.ReactNode, content: string | ReactNode }) {
    return (
        <Tooltip>
            <TooltipTrigger>{children}</TooltipTrigger>
            <TooltipContent className="py-2">
                <p className="text-xs font-serif">{content}</p>
            </TooltipContent>
        </Tooltip>
    )
}
