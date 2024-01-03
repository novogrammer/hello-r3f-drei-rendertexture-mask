import * as THREE from "three";

export const FOVY=30;

export const SCENE01_ORIGIN=new THREE.Vector3(0,0,0);
export const SCENE02_ORIGIN=new THREE.Vector3(0,-10,-10);

export const SCENE01_PLANE_Z=-5;
export const SCENE02_PLANE_Z=-4;

export const SCENE01_CAMERA_LOOKAT01=SCENE01_ORIGIN.clone();
export const SCENE01_CAMERA_LOOKAT02=SCENE01_ORIGIN.clone().add(new THREE.Vector3(0,-10,0));
export const SCENE01_CAMERA_LOOKAT03=SCENE02_ORIGIN.clone();

const z5=new THREE.Vector3(0,0,5);

export const SCENE01_CAMERA_POSITION01=SCENE01_CAMERA_LOOKAT01.clone().add(z5);
export const SCENE01_CAMERA_POSITION02=SCENE01_CAMERA_LOOKAT02.clone().add(z5);
export const SCENE01_CAMERA_POSITION03=SCENE01_CAMERA_LOOKAT03.clone().add(z5);

function makeCurvePath(pointList:THREE.Vector3[]):THREE.CurvePath<THREE.Vector3>{
  const curvePath=new THREE.CurvePath<THREE.Vector3>();
  const curve=new THREE.CatmullRomCurve3(pointList);
  curvePath.add(curve);
  return curvePath;

}

export const SCENE01_LOOKAT_CURVEPATH:THREE.CurvePath<THREE.Vector3>=makeCurvePath([
  SCENE01_CAMERA_LOOKAT01,
  SCENE01_CAMERA_LOOKAT02,
  SCENE01_CAMERA_LOOKAT03,
]);

export const SCENE01_POSITION_CURVEPATH:THREE.CurvePath<THREE.Vector3>=makeCurvePath([
  SCENE01_CAMERA_POSITION01,
  SCENE01_CAMERA_POSITION02,
  SCENE01_CAMERA_POSITION03,
]);
