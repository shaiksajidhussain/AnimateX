import * as THREE from 'three'
import { useMemo, useState, useRef } from 'react'
import { createPortal, useFrame, extend } from '@react-three/fiber'
import { useFBO } from '@react-three/drei'

// Custom shader material for the particles
class CloudPointsMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
        uniform sampler2D positions;
        uniform float uTime;
        uniform float uFocus;
        uniform float uFov;
        uniform float uBlur;
        varying float vDistance;
        varying vec2 vUv;

        void main() { 
          vec3 pos = texture2D(positions, position.xy).xyz;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          vDistance = abs(uFocus - -mvPosition.z);
          gl_PointSize = (step(1.0 - (1.0 / uFov), position.x)) * vDistance * uBlur;
          vUv = position.xy;
        }
      `,
      fragmentShader: `
        uniform float uOpacity;
        uniform float uTime;
        varying float vDistance;
        varying vec2 vUv;

        float noise(vec2 p) {
          return fract(sin(dot(p.xy, vec2(12.9898,78.233))) * 43758.5453);
        }

        void main() {
          vec2 cxy = 2.0 * gl_PointCoord - 1.0;
          float r = dot(cxy, cxy);
          if (r > 1.0) discard;
          
          // Sparkle effect
          float sparkle = noise(vUv + uTime * 0.1) * 0.5 + 0.5;
          sparkle = pow(sparkle, 8.0);
          
          // Soft particles
          float alpha = (1.04 - clamp(vDistance * 1.5, 0.0, 1.0));
          alpha *= smoothstep(1.0, 0.0, r);
          
          gl_FragColor = vec4(vec3(1.0), alpha * (1.0 + sparkle * 0.5));
        }
      `,
      uniforms: {
        positions: { value: null },
        uTime: { value: 0 },
        uFocus: { value: 5.1 },
        uFov: { value: 50 },
        uBlur: { value: 30 },
        uOpacity: { value: 1.0 }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  }
}

// Simulation material for particle movement
class CloudSimulationMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D positions;
        uniform float uTime;
        uniform float uFrequency;
        varying vec2 vUv;

        //... (previous noise functions)

        void main() {
          float t = uTime * 0.015;
          vec3 pos = texture2D(positions, vUv).xyz;
          
          // Create cloud-like movement
          vec3 curlPos = pos;
          float noise1 = snoise(pos * uFrequency + t);
          float noise2 = snoise(pos * uFrequency * 2.0 + t);
          
          curlPos += vec3(
            noise1 * 0.2,
            noise2 * 0.1,
            noise1 * noise2 * 0.1
          );
          
          gl_FragColor = vec4(mix(pos, curlPos, 0.5), 1.0);
        }
      `,
      uniforms: {
        positions: { value: null },
        uTime: { value: 0 },
        uFrequency: { value: 0.5 }
      }
    })
  }
}

extend({ CloudPointsMaterial, CloudSimulationMaterial })

export function CloudParticles({ 
  count = 512 * 512,
  size = 512,
  speed = 1,
  blur = 30,
  focus = 5.1,
  aperture = 2.8,
  ...props 
}) {
  // Add refs
  const simRef = useRef()
  const renderRef = useRef()

  // Set up scene and camera
  const [scene] = useState(() => new THREE.Scene())
  const [camera] = useState(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1))
  
  // Create geometry data
  const [positions] = useState(() => new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]))
  const [uvs] = useState(() => new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]))

  // Set up FBO
  const target = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType
  })

  // Create particles
  const particles = useMemo(() => {
    const length = size * size
    const particles = new Float32Array(length * 3)
    for (let i = 0; i < length; i++) {
      let i3 = i * 3
      particles[i3 + 0] = (i % size) / size
      particles[i3 + 1] = i / size / size
    }
    return particles
  }, [size])

  // Update FBO and pointcloud every frame
  useFrame((state) => {
    if (!simRef.current || !renderRef.current) return

    state.gl.setRenderTarget(target)
    state.gl.clear()
    state.gl.render(scene, camera)
    state.gl.setRenderTarget(null)

    renderRef.current.uniforms.positions.value = target.texture
    renderRef.current.uniforms.uTime.value = state.clock.elapsedTime
    renderRef.current.uniforms.uFocus.value = THREE.MathUtils.lerp(renderRef.current.uniforms.uFocus.value, focus, 0.1)
    renderRef.current.uniforms.uFov.value = THREE.MathUtils.lerp(renderRef.current.uniforms.uFov.value, 50, 0.1)
    renderRef.current.uniforms.uBlur.value = THREE.MathUtils.lerp(renderRef.current.uniforms.uBlur.value, (5.6 - aperture) * 9, 0.1)

    simRef.current.uniforms.uTime.value = state.clock.elapsedTime * speed
  })

  return (
    <>
      {createPortal(
        <mesh>
          <cloudSimulationMaterial ref={simRef} />
          <bufferGeometry>
            <bufferAttribute 
              attach="attributes-position" 
              count={positions.length / 3} 
              array={positions} 
              itemSize={3} 
            />
            <bufferAttribute 
              attach="attributes-uv" 
              count={uvs.length / 2} 
              array={uvs} 
              itemSize={2} 
            />
          </bufferGeometry>
        </mesh>,
        scene
      )}
      <points {...props}>
        <cloudPointsMaterial ref={renderRef} />
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position" 
            count={particles.length / 3} 
            array={particles} 
            itemSize={3} 
          />
        </bufferGeometry>
      </points>
    </>
  )
} 