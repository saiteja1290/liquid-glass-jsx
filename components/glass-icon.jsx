"use client"

import { cn } from "@/lib/utils"

export function GlassIcon({ children, className }) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center",
        "w-20 h-20 rounded-2xl",
        "bg-white/12 backdrop-blur-2xl",
        "border border-white/35",
        "shadow-xl shadow-black/25",
        "hover:bg-white/20 hover:scale-105",
        "transition-all duration-300 cursor-pointer",
        "before:absolute before:inset-0 before:rounded-2xl",
        "before:bg-gradient-to-br before:from-white/35 before:to-white/10 before:opacity-70",
        className,
      )}
      style={{
        backdropFilter: "blur(20px) saturate(200%)",
        WebkitBackdropFilter: "blur(20px) saturate(200%)",
      }}
    >
      {children}
    </div>
  )
}
