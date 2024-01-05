import { Canvas, useFrame } from '@react-three/fiber'
import './App.css'
import { Float, Loader, Mask, PerspectiveCamera, StatsGl } from '@react-three/drei'
import { Suspense, useRef } from 'react';
import { TunnelR3f } from './TunnelR3f';
import { Section01 } from './Section01';
import { Section02 } from './Section02';
import * as THREE from "three";
import { FOVY, SCENE01_LOOKAT_CURVEPATH, SCENE01_POSITION_CURVEPATH, SCENE02_LOOKAT_CURVEPATH, SCENE02_ORIGIN, SCENE02_POSITION_CURVEPATH } from './constants';
import { useScrollStore } from './useScrollStore';
import { ReactLenis } from '@studio-freight/react-lenis'
import { map } from './math_utils';
import { globalEventEmitter } from './globalEventEmitter';
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
  const section01Height=useScrollStore((state)=>state.section01Height);
  const section02Height=useScrollStore((state)=>state.section02Height);

  useFrame(()=>{
    if(!dummyCameraRef.current){
      return;
    }
    const dummyCamera=dummyCameraRef.current;
    if(!cameraGroupRef.current){
      return;
    }
    const cameraGroup=cameraGroupRef.current;


    let positionCurvePath=null;
    let lookatCurvePath=null;
    let t=0;
    
    if(window.scrollY<section01Height){
      positionCurvePath=SCENE01_POSITION_CURVEPATH;
      lookatCurvePath=SCENE01_LOOKAT_CURVEPATH;
      t=map(window.scrollY,0,section01Height,0,1,true);
    }else{
      positionCurvePath=SCENE02_POSITION_CURVEPATH;
      lookatCurvePath=SCENE02_LOOKAT_CURVEPATH;
      t=map(window.scrollY,section01Height,section01Height+section02Height,0,1,true);
    }
    const position=positionCurvePath.getPoint(t);
    dummyCamera.position.copy(position);
    const lookat=lookatCurvePath.getPoint(t);
    dummyCamera.lookAt(lookat);
    cameraGroup.matrixAutoUpdate=false;
    cameraGroup.matrix.copy(dummyCamera.matrix);

    globalEventEmitter.emit("updateCamera",{matrix:dummyCamera.matrix.clone()})


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
    <ReactLenis root options={{
      lerp:0.2,
    }}>
      <div style={{
        position:"fixed",
        left:0,
        top:0,
        width:"100%",
        height:"100lvh",
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
        <section style={{
          height:"100vh",
          padding:"1px",
        }}>
          <h2>Footer</h2>
        </section>
      </div>

    </ReactLenis>
  )
}

export default App
