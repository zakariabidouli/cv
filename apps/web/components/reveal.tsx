"use client"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right" | "none"
}

export function Reveal({ children, className, delay = 0, direction = "up" }: RevealProps) {
  const { ref, inView } = useInView()

  const hiddenMap = {
    up:    "opacity-0 translate-y-2",
    left:  "opacity-0 -translate-x-2",
    right: "opacity-0 translate-x-2",
    none:  "opacity-0",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        inView ? "opacity-100 translate-y-0 translate-x-0" : hiddenMap[direction],
        className
      )}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  )
}
