import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Model from './Model'
import { useRef } from 'react'

export default function MyCanvas() {
  const orbitControlsRef = useRef()

  return (
    <Canvas>
      <OrbitControls 
        ref={orbitControlsRef} 
        minPolarAngle={Math.PI / 6} 
        maxPolarAngle={Math.PI / 2} 
        enableZoom={false}
      />
      <ambientLight intensity={.4} />
      <Environment preset="sunset" />
      <color attach="background" args={['#fbd291']} />
      <Model scale={.9} position={[0, -1.5, 0]} rotation={[0, -Math.PI / 2, 0]} />
    </Canvas>
  )
}