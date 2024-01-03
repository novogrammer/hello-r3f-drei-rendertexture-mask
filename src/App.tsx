import { Canvas, useFrame } from '@react-three/fiber'
import './App.css'
import { Float, Loader, Mask, PerspectiveCamera, StatsGl } from '@react-three/drei'
import { Suspense, useRef } from 'react';
import { TunnelR3f } from './TunnelR3f';
import { Section01 } from './Section01';
import { Section02 } from './Section02';
import * as THREE from "three";
import { FOVY, SCENE01_LOOKAT_CURVEPATH, SCENE01_POSITION_CURVEPATH, SCENE02_ORIGIN } from './constants';
import { useScrollStore } from './useScrollStore';

function MaskScene(){
  return <>
    <Float rotationIntensity={10} position={SCENE02_ORIGIN}>
      <Mask id={2}>
        <boxGeometry args={[4,4,4]}/>
        <meshBasicMaterial/>
      </Mask>

    </Float>
  </>;
}


function GlobalScene(){
  const dummyCameraRef=useRef<THREE.PerspectiveCamera>(null);
  const cameraGroupRef=useRef<THREE.Group>(null);
  const setCameraMatrix=useScrollStore((state)=>state.setCameraMatrix);
  useFrame(()=>{
    if(!dummyCameraRef.current){
      return;
    }
    const dummyCamera=dummyCameraRef.current;
    if(!cameraGroupRef.current){
      return;
    }
    const cameraGroup=cameraGroupRef.current;

    
    const t=(performance.now()*0.001*0.1)%1;
    const position=SCENE01_POSITION_CURVEPATH.getPoint(t);
    dummyCamera.position.copy(position);
    const lookat=SCENE01_LOOKAT_CURVEPATH.getPoint(t);
    dummyCamera.lookAt(lookat);
    cameraGroup.matrixAutoUpdate=false;
    cameraGroup.matrix.copy(dummyCamera.matrix);
    setCameraMatrix(dummyCamera.matrix.clone());

  })
  return <>
    <StatsGl/>
    <group ref={cameraGroupRef}>
      <PerspectiveCamera makeDefault fov={FOVY} position={[0,0,0]}/>
      <Suspense fallback={null}>
        <TunnelR3f.Out/>
      </Suspense>
    </group>
    <PerspectiveCamera ref={dummyCameraRef} fov={FOVY} position={[0,0,5]}/>
    <MaskScene/>
  </>;
}


function App() {
  const containerRef=useRef<HTMLDivElement>(null!);
  return (
    <>
      <div style={{
        position:"fixed",
        left:0,
        top:0,
        width:"100%",
        height:"100%",
      }}>
        <Canvas eventSource={containerRef} shadows={'soft'}>
          <GlobalScene/>
        </Canvas>
        <Loader/>
      </div>
      <div ref={containerRef} style={{
          position:"relative",
      }}>
        <Section01/>
        <Section02/>
      </div>

    </>
  )
}

export default App
