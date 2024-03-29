import { Environment, Float, PerspectiveCamera, RenderTexture } from "@react-three/drei";
import { TunnelR3f } from "./TunnelR3f";
import { useFrame } from "@react-three/fiber";
import { FOVY, SCENE01_ORIGIN, SCENE01_PLANE_Z } from "./constants";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { calcHeightFactorFromFovy } from "./three_utils";
import { useScrollStore } from "./useScrollStore";
import { globalEventEmitter } from "./globalEventEmitter";
import styles from "./Section01.module.scss";


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
    <color attach="background" args={["cyan"]}/>
    <ambientLight intensity={0.6} />
    <directionalLight intensity={1.0} position={[0, 3, 5]}/>
    <PerspectiveCamera ref={cameraRef} name="SceneCamera01" makeDefault fov={FOVY} />
    <group position={SCENE01_ORIGIN}>
      <Float rotationIntensity={10} >
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" roughness={0.1} metalness={0.2} />
        </mesh>
      </Float>
      <Float rotationIntensity={10}  position={[-1,-3,-5]} >
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange"  roughness={0.1} metalness={0.2} />
        </mesh>
      </Float>
      <Float rotationIntensity={10}  position={[1,-6,-5]} >
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange"  roughness={0.1} metalness={0.2} />
        </mesh>
      </Float>
      <group>
        <Environment
          preset="dawn"
          background={false}
        />
      </group>
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
  const sectionRef=useRef<HTMLElement>(null);
  const setSection01Height = useScrollStore((state)=>state.setSection01Height);
  const update=useCallback(()=>{
    if(!sectionRef.current){
      throw new Error("sectionRef.current is null");
    }
    const section=sectionRef.current;
    const rect = section.getBoundingClientRect();
    setSection01Height(rect.height);
  },[setSection01Height])
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
    <section ref={sectionRef} className={styles["Section01"]}>
      <h2 className={styles["Section01__title"]}>Section01</h2>
      <p className={styles["Section01__text"]}>The quick brown fox jumps over the lazy dog.</p>
    </section>
  </>;
}