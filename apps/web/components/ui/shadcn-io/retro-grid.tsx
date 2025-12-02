"use client"

import { cn } from "@/lib/utils"

export function RetroGrid({
  className,
  angle = 0,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { angle?: number }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        className
      )}
      style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
      {...props}
    >
      {/* Primary Grid - Using text-primary which respects theme */}
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className={cn(
            "animate-grid text-primary",
            "[background-repeat:repeat] [background-size:60px_60px] [height:300%] [width:300%] [background-position:0_0]",
            "[background-image:linear-gradient(to_right,currentColor_1px,transparent_0),linear-gradient(to_bottom,currentColor_1px,transparent_0)]",
            "[transform:translate(-50%,-35%)]",
            "opacity-[0.2] dark:opacity-[0.3]"
          )}
        />
      </div>

      {/* Accent color overlay for cyberpunk effect */}
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className={cn(
            "animate-grid text-accent",
            "[background-repeat:repeat] [background-size:60px_60px] [height:300%] [width:300%] [background-position:0_0]",
            "[background-image:linear-gradient(to_right,currentColor_0.5px,transparent_0),linear-gradient(to_bottom,currentColor_0.5px,transparent_0)]",
            "[transform:translate(-50%,-35%)]",
            "opacity-[0.25] dark:opacity-[0.35]"
          )}
          style={{ animationDelay: "7.5s" }}
        />
      </div>
    </div>
  )
}


