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

  //UseMemo to make calculations of random star positions faster
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = -150 + (Math.random() - 0.5) * 200;
    }

    return positions;
  }, [])

  //UseFrame for each new render frame
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

function CameraRig({ screen, controlsRef, viewMode }) {

  useFrame((state) => {
    if (!controlsRef.current) return;

    const isStaticMode = viewMode === 'static';

    //If user enters screen
    if (screen === "on") {
      // Disables controls for 3D model when zooming in.
      if (controlsRef.current) controlsRef.current.enabled = false;

      //Specific movement to make camera right on top of screen
      targetVec.set(0, -2, 42.5);
      state.camera.position.lerp(targetVec, 0.028);
      state.camera.lookAt(0, -2, 38);
    }
    else if (isStaticMode) {
      targetVec.set(0, 0, 52);
      state.camera.position.lerp(targetVec, 0.02);
      state.camera.lookAt(0, -1, 38);
      controlsRef.current.enabled = false;
    }
    else {
      targetVec.set(0, 0, 50);
      const distance = state.camera.position.distanceTo(targetVec);

      // Override the camera when travelling to monitor screen
      if (distance > 0.5) {
        state.camera.position.lerp(targetVec, 0.028);
        state.camera.lookAt(computerPos);
      } else {
        // Once the movement is complete, return control back to Orbit Controls
        controlsRef.current.enabled = true;
      }
    }
  });

  return null;
}

//Final export of all the components
function SpaceBackground({ audio, screen, screenControl, viewMode = 'console' }) {
  const cameraControls = useRef();

  return (

    <div className="background_div">

      {/* Canvas for Orbit Controls + Meshes */}
      <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
        <CameraRig controlsRef={cameraControls} screen={screen} viewMode={viewMode}></CameraRig>
        <OrbitControls
          ref={cameraControls}
          target={[0, -3, 38]}
          enablePan={false}
          enabled={screen === "off" && viewMode === "console"}
          minDistance={10}
          maxDistance={70}
        >

        </OrbitControls>

        <color attach="background" args={['#10091b']}></color>

        {/* Fog to prevent farther stars from being visible */}
        <fogExp2 attach="fog" args={['#0d1033', 0.02]}></fogExp2>

        {/* Stars */}
        <StarField />

        {/* Lights to make the Computer Monitor Visible */}
        <ambientLight intensity={1.5}></ambientLight>
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <Environment preset="night"></Environment>

        {/* Computer Mesh */}
        <Retro
          position={viewMode === 'static' ? [0, -0.5, 38] : [0, -3, 38]}
          scale={viewMode === 'static' ? 1.3 : 5}
          screenControl={screenControl}
          rotation={[0, Math.PI * 1.5, 0]}
          audio={audio}
        ></Retro>


      </Canvas>
    </div>
  )
}

export default SpaceBackground;