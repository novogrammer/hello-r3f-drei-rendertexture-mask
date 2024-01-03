import {create} from "zustand";
import * as THREE from "three";

interface ScrollState{
  cameraMatrix:THREE.Matrix4;
  setCameraMatrix:(cameraMatrix:THREE.Matrix4)=>void;
  section01Ratio:number;
  setSection01Ratio:(section01Ratio:number)=>void;
  section02Ratio:number;
  setSection02Ratio:(section02Rect:number)=>void;
}

export const useScrollStore = create<ScrollState>((set)=>({
  cameraMatrix:new THREE.Matrix4(),
  setCameraMatrix:(cameraMatrix:THREE.Matrix4)=>set(()=>({cameraMatrix})),
  section01Ratio:0,
  setSection01Ratio:(section01Ratio:number)=>set(()=>({section01Ratio})),
  section02Ratio:0,
  setSection02Ratio:(section02Ratio:number)=>set(()=>({section02Ratio})),
}));