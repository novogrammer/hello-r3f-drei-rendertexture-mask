import { Float, PerspectiveCamera, RenderTexture } from "@react-three/drei";
import { TunnelR3f } from "./TunnelR3f";
import { useFrame } from "@react-three/fiber";
import { FOVY, SCENE01_ORIGIN, SCENE01_PLANE_Z } from "./constants";
import { useRef } from "react";
import * as THREE from "three";
import { calcHeightFactorFromFovy } from "./three_utils";
import { useScrollStore } from "./useScrollStore";

function Scene(){
  const cameraRef=useRef<THREE.PerspectiveCamera>(null);
  const cameraMatrix=useScrollStore((state)=>state.cameraMatrix);

  useFrame(()=>{
    if(!cameraRef.current){
      return;
    }
    const camera=cameraRef.current;
    camera.matrixAutoUpdate=false;
    camera.matrix=cameraMatrix;

  });
  
  return <>
    <color attach="background" args={["green"]}/>
    <ambientLight intensity={0.6} />
    <directionalLight intensity={1.0} position={[0, 3, 5]}/>
    <PerspectiveCamera ref={cameraRef} makeDefault fov={FOVY} />
    <group position={SCENE01_ORIGIN}>
      <Float rotationIntensity={10} >
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </Float>
    </group>
  </>;

}



function Portal(){
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
    mesh.scale.y=Math.abs(SCENE01_PLANE_Z) * heightFactor;
    mesh.scale.x=Math.abs(SCENE01_PLANE_Z) * heightFactor * state.viewport.aspect;
  });

  return <>
    <mesh position={[0,0,SCENE01_PLANE_Z]} ref={meshRef}>
      <planeGeometry args={[1,1]} />
      <meshBasicMaterial>
        <RenderTexture attach="map">
          <Scene/>
        </RenderTexture>
      </meshBasicMaterial>
    </mesh>

  </>;
}


export function Section01(){
  return <>
    <TunnelR3f.In>
      <Portal/>
    </TunnelR3f.In>
    <section style={{
      height:"200vh",
    }}>
      <h2>Section01</h2>
    </section>
  </>;
}