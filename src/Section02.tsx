import { Float, PerspectiveCamera, RenderTexture, useMask } from "@react-three/drei";
import { TunnelR3f } from "./TunnelR3f";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { FOVY, SCENE02_ORIGIN, SCENE02_PLANE_Z } from "./constants";
import * as THREE from "three";
import { calcHeightFactorFromFovy } from "./three_utils";
import { useScrollStore } from "./useScrollStore";
import { map } from "./math_utils";


function Scene(){
  const cameraRef=useRef<THREE.PerspectiveCamera>(null);
  const cameraMatrix=useScrollStore((state)=>state.cameraMatrix);

  useEffect(()=>{
    if(!cameraRef.current){
      return;
    }
    const camera=cameraRef.current;
    camera.matrixAutoUpdate=false;
    camera.matrix=cameraMatrix;
  },[cameraMatrix]);

  return <>
    <color attach="background" args={["orange"]}/>
    <ambientLight intensity={0.6} />
    <directionalLight intensity={1.0} position={[0, 3, 5]}/>
    <PerspectiveCamera ref={cameraRef} makeDefault fov={FOVY} />
    <group position={SCENE02_ORIGIN}>

    <Float rotationIntensity={10}>
        <mesh scale={0.5}>
          <torusKnotGeometry />
          <meshStandardMaterial color="magenta" />
        </mesh>
      </Float>
      <Float rotationIntensity={10} position={[3,3,-5]}>
        <mesh scale={0.5}>
          <torusKnotGeometry />
          <meshStandardMaterial color="magenta" />
        </mesh>
      </Float>
      <Float rotationIntensity={10} position={[-3,-3,-5]}>
        <mesh scale={0.5}>
          <torusKnotGeometry />
          <meshStandardMaterial color="magenta" />
        </mesh>
      </Float>
    </group>
  </>;

}


function Portal(){
  const stencil = useMask(2, false);
  const section01Ratio=useScrollStore((state)=>state.section01Ratio);

  if(1<=section01Ratio){
    stencil.stencilWrite=false;
  }
  const meshRef=useRef<THREE.Mesh>(null);
  useFrame((state)=>{
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
  const setSection02Ratio = useScrollStore((state)=>state.setSection02Ratio);
  const update=useCallback(()=>{
    if(!sectionRef.current){
      throw new Error("sectionRef.current is null");
    }
    const section=sectionRef.current;
    const rect = section.getBoundingClientRect();
    const ratio=map(0,rect.top,rect.bottom,0,1);
    setSection02Ratio(ratio);
  },[setSection02Ratio]);
  useLayoutEffect(()=>{
    window.addEventListener("scroll",update);
    window.addEventListener("resize",update);
    return ()=>{
      window.removeEventListener("scroll",update);
      window.removeEventListener("resize",update);
    }
  },[update])

  return <>
    <TunnelR3f.In>
      <Portal/>
    </TunnelR3f.In>
    <section ref={sectionRef} style={{
      height:"200vh",
      padding:"1px",
    }}>
      <h2>Section02</h2>
    </section>
  </>;
}