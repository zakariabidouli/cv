import { cn } from "@/lib/utils"

type Props = {
  number: string
  title:  string
  className?: string
}

export function SectionDivider({ number, title, className }: Props) {
  return (
    <div className={cn("mb-16 lg:mb-20", className)}>
      <div className="border-t border-border/50" />
      <div className="flex items-center justify-between py-3">
        <span className="font-mono text-[10px] text-muted-foreground/50 tracking-[0.2em]">
          {number}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-[0.25em]">
          {title}
        </span>
      </div>
      <div className="border-b border-border/50" />
    </div>
  )
}
