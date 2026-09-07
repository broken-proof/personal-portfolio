import { useMemo, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Retro from '../ComputerScreen/Retro.jsx'
import { OrbitControls, Environment } from '@react-three/drei'
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
    if (pointsRef.current) {
      pointsRef.current.rotation.z += 0.0015;
    }
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
const computerPos = new THREE.Vector3(0, -3, 38);

function CameraRig({ screen, controlsRef }) {
  useFrame((state) => {
    if (!controlsRef.current) return;

    if (screen === "on") {
      // Instantly disable controls when zooming in
      if (controlsRef.current) controlsRef.current.enabled = false;

      targetVec.set(0, -2, 42.5);
      state.camera.position.lerp(targetVec, 0.05);
      state.camera.lookAt(0, -2, 38);
    }
    else {
      targetVec.set(0, 0, 50);
      const distance = state.camera.position.distanceTo(targetVec);

      // ONLY override the camera while traveling
      if (distance > 0.5) {
        state.camera.position.lerp(targetVec, 0.05);
        state.camera.lookAt(computerPos);
      } else {
        // Once arrived, hand FULL control back to OrbitControls
        // and stop injecting manual lookAt commands
        controlsRef.current.enabled = true;
      }
    }
  });

  return null;
}


function SpaceBackground({ audio, screen, screenControl }) {
  const cameraControls = useRef();

  return (
    <div className="background_div">
      <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
        <CameraRig controlsRef={cameraControls} screen={screen}></CameraRig>
        <OrbitControls
          ref={cameraControls}
          target={[0, -3, 38]}
          enablePan={false}
          enabled={screen === "off"}
          minDistance={10}
          maxDistance={70}
        >

        </OrbitControls>

        <color attach="background" args={['#10091b']}></color>
        <fogExp2 attach="fog" args={['#0d1033', 0.02]}></fogExp2>
        <StarField />
        <ambientLight intensity={1.5}></ambientLight>
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <Environment preset="night"></Environment>

        <Retro
          position={[0, -3, 38]}
          scale={5}
          screenControl={screenControl}
          rotation={[0, Math.PI * 1.5, 0]}
          audio={audio}
        ></Retro>


      </Canvas>
    </div>
  )
}

export default SpaceBackground;