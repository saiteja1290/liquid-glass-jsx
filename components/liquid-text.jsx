"use client"

import { cn } from "@/lib/utils"

export function LiquidText({ children, className }) {
  return (
    <span
      className={cn("liquid-text", className)}
      style={{
        background: "linear-gradient(45deg, #ffffff, #e0e7ff, #c7d2fe)",
        backgroundSize: "200% 200%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
      <style jsx>{`
        .liquid-text {
          text-shadow: 0 0 10px rgba(255,255,255,0.3);
          transition: all 0.3s ease;
        }
        
        .liquid-text:hover {
          text-shadow: 0 0 15px rgba(255,255,255,0.5);
          transform: scale(1.02);
        }
      `}</style>
    </span>
  )
}
