import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export default function Model(props) {
  const { scene } = useGLTF(import.meta.env.VITE_APP_MODEL_3D)
  const ref = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    
    // Create a smooth wave-like movement
    const xMovement = Math.sin(t * 0.5) * 0.2 // Left-right movement
    const yMovement = Math.cos(t * 0.4) * 0.1 // Up-down movement
    
    // Apply the smooth wave-like movement to the model
    ref.current.position.x = xMovement
    ref.current.position.y = yMovement
    
    // Add a slight rotation for more natural movement
    ref.current.rotation.y = Math.sin(t * 0.3) * 0.1
  })

  return <group {...props}>
    <primitive ref={ref} object={scene} />
  </group>
}

useGLTF.preload(import.meta.env.VITE_APP_MODEL_3D)