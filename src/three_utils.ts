import * as THREE from "three";
export function calcHeightFactorFromFovy(fovy:number){
  return Math.tan(fovy * THREE.MathUtils.DEG2RAD /2)*2;
}