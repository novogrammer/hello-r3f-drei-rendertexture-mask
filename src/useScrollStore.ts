import {create} from "zustand";
import * as THREE from "three";

interface ScrollState{
  cameraMatrix:THREE.Matrix4;
  setCameraMatrix:(cameraMatrix:THREE.Matrix4)=>void;
}

export const useScrollStore = create<ScrollState>((set)=>({
  cameraMatrix:new THREE.Matrix4(),
  setCameraMatrix:(cameraMatrix:THREE.Matrix4)=>set(()=>({cameraMatrix})),
}));