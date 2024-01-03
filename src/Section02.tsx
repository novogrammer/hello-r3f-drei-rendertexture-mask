import { Float, PerspectiveCamera, RenderTexture, useMask } from "@react-three/drei";
import { TunnelR3f } from "./TunnelR3f";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { FOVY, SCENE02_ORIGIN, SCENE02_PLANE_Z } from "./constants";
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
  // stencil.stencilWrite=false;
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

  return <>
    <TunnelR3f.In>
      <Portal/>
    </TunnelR3f.In>
    <section style={{
      height:"200vh",
    }}>
      <h2>Section02</h2>
    </section>
  </>;
}