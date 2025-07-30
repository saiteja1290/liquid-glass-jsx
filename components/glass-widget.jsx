"use client"

import { cn } from "@/lib/utils"

export function GlassWidget({ children, className }) {
  return (
    <div
      className={cn(
        "relative p-6 rounded-3xl",
        "bg-white/8 backdrop-blur-2xl",
        "border border-white/25",
        "shadow-2xl shadow-black/30",
        "hover:bg-white/12 transition-all duration-300",
        "before:absolute before:inset-0 before:rounded-3xl",
        "before:bg-gradient-to-br before:from-white/25 before:to-white/5 before:opacity-60",
        "overflow-hidden",
        className,
      )}
      style={{
        backdropFilter: "blur(25px) saturate(200%)",
        WebkitBackdropFilter: "blur(25px) saturate(200%)",
      }}
    >
      {children}
    </div>
  )
}
