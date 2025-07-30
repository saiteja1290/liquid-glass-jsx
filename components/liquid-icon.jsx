"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"

const iconVertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  
  float noise(vec3 p) {
    return sin(p.x * 10.0) * sin(p.y * 10.0) * sin(p.z * 10.0);
  }
  
  void main() {
    vUv = uv;
    vNormal = normal;
    
    vec3 pos = position;
    float time = uTime * 0.8;
    
    // Liquid blob deformation
    float displacement = noise(pos + time) * 0.05;
    displacement += noise(pos * 2.0 + time * 1.2) * 0.025;
    
    pos += normal * displacement;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const iconFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying vec3 vNormal;
  
  void main() {
    float time = uTime * 0.5;
    
    // Liquid surface effect
    float fresnel = pow(1.0 - dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 1.5);
    
    // Animated liquid colors
    vec3 color1 = vec3(0.3, 0.8, 0.9);
    vec3 color2 = vec3(0.9, 0.4, 0.8);
    vec3 color3 = vec3(0.4, 0.9, 0.3);
    
    vec3 finalColor = mix(color1, color2, sin(time + vUv.x * 5.0) * 0.5 + 0.5);
    finalColor = mix(finalColor, color3, sin(time * 1.3 + vUv.y * 5.0) * 0.5 + 0.5);
    
    finalColor += fresnel * 0.5;
    
    float alpha = 0.2 + fresnel * 0.4;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`

export function LiquidIcon({ children, position, iconType }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime()

      // Organic floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.7 + position[0]) * 0.05
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.4 + position[0]) * 0.1
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 0.2]} />
        <shaderMaterial
          vertexShader={iconVertexShader}
          fragmentShader={iconFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uColor: { value: [0.5, 0.8, 0.9] },
          }}
          transparent
          depthWrite={false}
        />
      </mesh>
      <Html
        transform
        occlude
        position={[0, 0, 0.2]}
        style={{
          width: "80px",
          height: "100px",
          pointerEvents: "none",
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
          <div className="text-3xl mb-2">
            {iconType === "flower" && "🌸"}
            {iconType === "rocket" && "🚀"}
            {iconType === "mic" && "🎙️"}
            {iconType === "video" && "📹"}
          </div>
          {children}
        </div>
      </Html>
    </group>
  )
}
