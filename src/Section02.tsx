import { Environment, Float, PerspectiveCamera, RenderTexture, useMask } from "@react-three/drei";
import { TunnelR3f } from "./TunnelR3f";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { FOVY, SCENE02_ORIGIN, SCENE02_PLANE_Z } from "./constants";
import * as THREE from "three";
import { calcHeightFactorFromFovy } from "./three_utils";
import { useScrollStore } from "./useScrollStore";
import { globalEventEmitter } from "./globalEventEmitter";


function Scene(){
  const cameraRef=useRef<THREE.PerspectiveCamera>(null);
  useEffect(()=>{
    const onUpdateCamera=({matrix}:{matrix:THREE.Matrix4})=>{
      if(!cameraRef.current){
        return;
      }
      const camera=cameraRef.current;
      camera.matrixAutoUpdate=false;
      camera.matrix=matrix;
  
    };
    globalEventEmitter.on("updateCamera",onUpdateCamera);
    return()=>{
      globalEventEmitter.off("updateCamera",onUpdateCamera);
    }
  },[]);

  return <>
    <color attach="background" args={["orange"]}/>
    <ambientLight intensity={0.6} />
    <directionalLight intensity={1.0} position={[0, 3, 5]}/>
    <PerspectiveCamera ref={cameraRef} makeDefault fov={FOVY} />
    <group position={SCENE02_ORIGIN}>

      <Float rotationIntensity={10}>
        <mesh scale={0.5}>
          <torusKnotGeometry />
          <meshStandardMaterial color="magenta" roughness={0.1} metalness={0.2} />
        </mesh>
      </Float>
      <Float rotationIntensity={10} position={[3,3,-5]}>
        <mesh scale={0.5}>
          <torusKnotGeometry />
          <meshStandardMaterial color="magenta" roughness={0.1} metalness={0.2} />
        </mesh>
      </Float>
      <Float rotationIntensity={10} position={[-3,-3,-5]}>
        <mesh scale={0.5}>
          <torusKnotGeometry />
          <meshStandardMaterial color="magenta" roughness={0.1} metalness={0.2} />
        </mesh>
      </Float>
    </group>
    <group>
      <Environment
        preset="city"
        background
      />
    </group>
  </>;

}


function Portal(){
  const stencil = useMask(2, false);
  const section01Height=useScrollStore((state)=>state.section01Height);
  const [isMaskEnabled,setIsMaskEnabled]=useState(false);
  stencil.stencilWrite=isMaskEnabled;
  
  const meshRef=useRef<THREE.Mesh>(null);
  useFrame((state)=>{
    setIsMaskEnabled(window.scrollY<section01Height);

    if(!(state.camera instanceof THREE.PerspectiveCamera)){
      throw new Error("camera is not PerspectiveCamera");
    }
    if(!meshRef.current){
      return;
    }
    const heightFactor=calcHeightFactorFromFovy(state.camera.fov);
    
    const mesh=meshRef.current;
    mesh.scale.y=Math.abs(SCENE02_PLANE_Z) * heightFactor;
    mesh.scale.x=Math.abs(SCENE02_PLANE_Z) * heightFactor * state.viewport.aspect;
  });

  return <>
    <mesh position={[0,0,SCENE02_PLANE_Z]} ref={meshRef}>
        <planeGeometry args={[1,1]} />
        <meshBasicMaterial {...stencil}>
          <RenderTexture attach="map">
            <Scene/>
          </RenderTexture>
        </meshBasicMaterial>
    </mesh>
  </>;
}


export function Section02(){
  const sectionRef=useRef<HTMLElement>(null);
  const setSection02Height = useScrollStore((state)=>state.setSection02Height);
  const update=useCallback(()=>{
    if(!sectionRef.current){
      throw new Error("sectionRef.current is null");
    }
    const section=sectionRef.current;
    const rect = section.getBoundingClientRect();
    setSection02Height(rect.height);
  },[setSection02Height]);
  useLayoutEffect(()=>{
    // window.addEventListener("scroll",update);
    window.addEventListener("resize",update);
    update();
    return ()=>{
      // window.removeEventListener("scroll",update);
      window.removeEventListener("resize",update);
    }
  },[update])

  return <>
    <TunnelR3f.In>
      <Portal/>
    </TunnelR3f.In>
    <section ref={sectionRef} style={{
      height:"200svh",
      padding:"1px",
    }}>
      <h2>Section02</h2>
    </section>
  </>;
}