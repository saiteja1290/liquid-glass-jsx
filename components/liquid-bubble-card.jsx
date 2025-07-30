"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"

const bubbleVertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  // Noise function
  float noise(vec3 p) {
    return sin(p.x) * sin(p.y) * sin(p.z);
  }
  
  void main() {
    vUv = uv;
    vNormal = normal;
    
    // Create liquid bubble displacement
    float time = uTime * 0.5;
    vec3 pos = position;
    
    // Add organic bubble deformation
    float displacement = noise(pos * 3.0 + time) * 0.1;
    displacement += noise(pos * 6.0 + time * 1.5) * 0.05;
    displacement += noise(pos * 12.0 + time * 0.8) * 0.025;
    
    pos += normal * displacement;
    vPosition = pos;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const bubbleFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    // Create liquid glass effect
    float fresnel = pow(1.0 - dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 2.0);
    
    // Animated liquid surface
    float time = uTime * 0.3;
    float wave = sin(vPosition.x * 10.0 + time) * sin(vPosition.y * 10.0 + time * 1.5) * 0.1;
    
    // Glass-like transparency with liquid shimmer
    vec3 color = uColor;
    color += vec3(0.2, 0.4, 0.8) * fresnel;
    color += vec3(0.8, 0.2, 0.6) * wave;
    
    float alpha = 0.15 + fresnel * 0.3 + wave * 0.1;
    
    gl_FragColor = vec4(color, alpha);
  }
`

export function LiquidBubbleCard({ children, position, scale = [1, 1, 1] }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime()

      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.05
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <shaderMaterial
          vertexShader={bubbleVertexShader}
          fragmentShader={bubbleFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uColor: { value: [0.2, 0.6, 0.9] },
          }}
          transparent
          depthWrite={false}
        />
      </mesh>
      <Html
        transform
        occlude
        position={[0, 0, 0]}
        style={{
          width: "300px",
          height: "200px",
          pointerEvents: "none",
        }}
      >
        <div className="w-full h-full flex items-center justify-center">{children}</div>
      </Html>
    </group>
  )
}
