import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import Model from './Model'
import { useRef, Suspense } from 'react'

export default function MyCanvas() {
  const orbitControlsRef = useRef()

  return (
    <Canvas>
      <Suspense fallback={
        <Html center>
          <div className="animate-pulse text-lg font-bold text-gray-700">
            Loading...
          </div>
        </Html>
      }>
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
      </Suspense>
    </Canvas>
  )
}