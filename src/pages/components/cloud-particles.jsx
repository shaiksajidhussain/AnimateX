import { Canvas } from '@react-three/fiber'
import { CloudParticles } from '../../Components/animations/CloudParticles'

export default function CloudParticlesDemo() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <CloudParticles 
          count={262144}
          size={512}
          speed={1}
          blur={30}
          focus={5.1}
          aperture={2.8}
        />
      </Canvas>
    </div>
  )
} 