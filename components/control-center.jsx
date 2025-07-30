"use client"

import { useState } from "react"
import { BubbleCard } from "@/components/bubble-card"
import { LiquidText } from "@/components/liquid-text"
import { Wifi, Bluetooth, Plane, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"

function ToggleButton({ icon, isActive, onToggle, color }) {
  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onToggle()
  }

  const activeColors = {
    blue: "bg-blue-500/40 border-blue-400/60 shadow-lg shadow-blue-500/30",
    green: "bg-green-500/40 border-green-400/60 shadow-lg shadow-green-500/30",
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative flex items-center justify-center rounded-full transition-all duration-300 ease-out",
        "border border-white/25 backdrop-blur-xl w-16 h-16",
        "hover:scale-105 active:scale-95",
        isActive ? activeColors[color] : "bg-white/10 hover:bg-white/15",
      )}
      style={{
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      <div
        className={cn(
          "transition-colors duration-300",
          isActive ? (color === "blue" ? "text-blue-200" : "text-green-200") : "text-white/80",
        )}
      >
        {icon}
      </div>

      {/* Bubble highlight effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-full opacity-0 transition-opacity duration-300",
          "bg-gradient-to-br from-white/20 to-transparent",
          isActive && "opacity-100",
        )}
      />
    </button>
  )
}

export function ControlCenter({ className }) {
  const [toggles, setToggles] = useState({
    wifi: true,
    bluetooth: false,
    airplane: false,
    sound: true,
  })

  const handleToggle = (key) => {
    console.log(`Toggling ${key}`) // Debug log
    setToggles((prev) => {
      const newState = {
        ...prev,
        [key]: !prev[key],
      }
      console.log("New state:", newState) // Debug log
      return newState
    })
  }

  return (
    <BubbleCard className={className}>
      <div className="mb-8 text-center">
        <LiquidText className="text-white font-semibold text-xl">Control Center</LiquidText>
      </div>

      {/* Centered 4 Buttons Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-6">
          <ToggleButton
            icon={<Wifi className="w-7 h-7" />}
            isActive={toggles.wifi}
            onToggle={() => handleToggle("wifi")}
            color="blue"
          />
          <ToggleButton
            icon={<Bluetooth className="w-7 h-7" />}
            isActive={toggles.bluetooth}
            onToggle={() => handleToggle("bluetooth")}
            color="blue"
          />
          <ToggleButton
            icon={<Plane className="w-7 h-7" />}
            isActive={toggles.airplane}
            onToggle={() => handleToggle("airplane")}
            color="green"
          />
          <ToggleButton
            icon={<Volume2 className="w-7 h-7" />}
            isActive={toggles.sound}
            onToggle={() => handleToggle("sound")}
            color="green"
          />
        </div>
      </div>

      <div className="absolute bottom-4 left-4">
        <LiquidText className="text-white/60 text-sm">Control Center</LiquidText>
      </div>
    </BubbleCard>
  )
}
