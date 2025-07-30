"use client"

import { ControlCenter } from "@/components/control-center"

export default function Component() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Less Blurred Background */}
      <div className="absolute inset-0 z-0">
        <img src="https://picsum.photos/1920/1080" alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 light-blur-overlay" />
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 p-8 h-full flex items-center justify-center">
        {/* Control Center Only */}
        <ControlCenter className="w-full max-w-sm" />
      </div>

      <style jsx>{`
        .light-blur-overlay {
          backdrop-filter: blur(15px) saturate(120%) brightness(0.9);
          -webkit-backdrop-filter: blur(15px) saturate(120%) brightness(0.9);
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(0, 0, 0, 0.1) 100%
          );
        }
      `}</style>
    </div>
  )
}
