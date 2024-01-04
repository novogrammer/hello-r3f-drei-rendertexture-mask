import {create} from "zustand";
import * as THREE from "three";

interface ScrollState{
  cameraMatrix:THREE.Matrix4;
  setCameraMatrix:(cameraMatrix:THREE.Matrix4)=>void;
  section01Height:number;
  setSection01Height:(section01Height:number)=>void;
  section02Height:number;
  setSection02Height:(section02Height:number)=>void;
}

export const useScrollStore = create<ScrollState>((set)=>({
  cameraMatrix:new THREE.Matrix4(),
  setCameraMatrix:(cameraMatrix:THREE.Matrix4)=>set(()=>({cameraMatrix})),
  section01Height:10000,
  setSection01Height:(section01Height:number)=>set(()=>({section01Height})),
  section02Height:10000,
  setSection02Height:(section02Height:number)=>set(()=>({section02Height})),
}));