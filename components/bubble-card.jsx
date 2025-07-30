"use client"

import { cn } from "@/lib/utils"

export function BubbleCard({ children, className }) {
  return (
    <div
      className={cn(
        "relative p-6 rounded-3xl cursor-pointer",
        "bg-white/8 backdrop-blur-2xl",
        "border border-white/25",
        "shadow-2xl shadow-black/30",
        "transition-all duration-500 ease-out",
        "hover:scale-105 hover:bg-white/12",
        "hover:shadow-3xl hover:shadow-black/40",
        "active:scale-95",
        "before:absolute before:inset-0 before:rounded-3xl",
        "before:bg-gradient-to-br before:from-white/25 before:to-white/5 before:opacity-60",
        "after:absolute after:inset-0 after:rounded-3xl after:opacity-0",
        "after:bg-gradient-to-br after:from-white/40 after:to-white/10",
        "hover:after:opacity-100 after:transition-opacity after:duration-300",
        "overflow-hidden bubble-surface",
        className,
      )}
      style={{
        backdropFilter: "blur(25px) saturate(200%)",
        WebkitBackdropFilter: "blur(25px) saturate(200%)",
      }}
    >
      {children}
      <style jsx>{`
        .bubble-surface {
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255,255,255,0.1) 0%, transparent 50%);
        }
        
        .bubble-surface:hover {
          background-image: 
            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(255,255,255,0.3) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 60%);
        }
        
        .bubble-pop {
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .bubble-pop:hover {
          transform: scale(1.05);
        }
        
        .bubble-pop:active {
          transform: scale(0.95);
        }
        
        .bubble-item {
          transition: all 0.3s ease;
          padding: 8px;
          border-radius: 12px;
        }
        
        .bubble-item:hover {
          background: rgba(255,255,255,0.1);
          transform: translateX(4px);
        }
      `}</style>
    </div>
  )
}
