import { useMemo, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Retro from '../ComputerScreen/Retro.jsx'
import './background.css'
import * as THREE from 'three'

function StarField() {
  const pointsRef = useRef();
  const count = 5000;
  const distance = 50;
  const acceleration = 0.4;

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = -150 + (Math.random() - 0.5) * 200;
    }

    return positions;
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return;

    const posAttribute = pointsRef.current.geometry.attributes.position;
    const posArray = posAttribute.array;

    for (let i = 0; i < count * 3; i += 3) {
      posArray[i + 2] += acceleration;

      if (posArray[i + 2] > distance) {
        posArray[i + 2] = -100 - Math.random() * 50;
        posArray[i] = (Math.random() - 0.5) * 50;
        posArray[i + 1] = (Math.random() - 0.5) * 50;
      }
    }

    posAttribute.needsUpdate = true;
    state.camera.rotation.z += 0.0015;
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        ></bufferAttribute>
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#ead0fa"
        transparent
        sizeAttenuation
      >

      </pointsMaterial>
    </points>
  )
}

const targetVec = new THREE.Vector3();

function CameraRig({ screen }) {
  useFrame((state) => {
    // Update the vector's coordinates based on state
    if (screen === "on") {
      targetVec.set(0, -0.5, 42);
    } else {
      targetVec.set(0, 0, 50);
    }

    // Smoothly interpolate the camera position toward the target
    state.camera.position.lerp(targetVec, 0.05);

  });

  return null;
}


function SpaceBackground({ screen, screenControl }) {




  return (
    <div className="background_div">
      <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
        <CameraRig screen={screen}></CameraRig>
        <color attach="background" args={['#10091b']}></color>
        <fogExp2 attach="fog" args={['#0d1033', 0.02]}></fogExp2>
        <StarField />
        <ambientLight intensity={1.5}></ambientLight>
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <Retro position={[0, -2, 36]} scale={4} screenControl={screenControl}></Retro>
      </Canvas>
    </div>
  )
}

export default SpaceBackground;