"use client"

import { cn } from "@/lib/utils"

export function BubbleIcon({ children, className }) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center",
        "w-20 h-24 rounded-2xl cursor-pointer",
        "bg-white/12 backdrop-blur-2xl",
        "border border-white/35",
        "shadow-xl shadow-black/25",
        "transition-all duration-500 ease-out",
        "hover:scale-110 hover:bg-white/20",
        "hover:shadow-2xl hover:shadow-black/40",
        "active:scale-90",
        "before:absolute before:inset-0 before:rounded-2xl",
        "before:bg-gradient-to-br before:from-white/35 before:to-white/10 before:opacity-70",
        "after:absolute after:inset-0 after:rounded-2xl after:opacity-0",
        "after:bg-gradient-to-br after:from-white/50 after:to-white/20",
        "hover:after:opacity-100 after:transition-opacity after:duration-300",
        "bubble-icon-surface",
        className,
      )}
      style={{
        backdropFilter: "blur(20px) saturate(200%)",
        WebkitBackdropFilter: "blur(20px) saturate(200%)",
        animation: "bubbleIconFloat 4s ease-in-out infinite",
      }}
    >
      {children}
      <style jsx>{`
        @keyframes bubbleIconFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(1deg); }
        }
        
        .bubble-icon-surface {
          background-image: 
            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 40%),
            radial-gradient(circle at 70% 70%, rgba(255,255,255,0.2) 0%, transparent 40%);
        }
        
        .bubble-icon-surface:hover {
          background-image: 
            radial-gradient(circle at 40% 40%, rgba(255,255,255,0.5) 0%, transparent 50%),
            radial-gradient(circle at 60% 60%, rgba(255,255,255,0.3) 0%, transparent 50%);
        }
      `}</style>
    </div>
  )
}
