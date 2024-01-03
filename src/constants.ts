import * as THREE from "three";

export const FOVY=30;

export const SCENE01_ORIGIN=new THREE.Vector3(0,0,0);
export const SCENE02_ORIGIN=new THREE.Vector3(0,-10,-10);

export const SCENE01_PLANE_Z=-5;
export const SCENE02_PLANE_Z=-4;

const pz5=new THREE.Vector3(0,0,5);
const mz5=new THREE.Vector3(0,0,-5);
const px5=new THREE.Vector3(5,0,0);
function makeCurvePath(pointList:THREE.Vector3[]):THREE.CurvePath<THREE.Vector3>{
  const curvePath=new THREE.CurvePath<THREE.Vector3>();
  const curve=new THREE.CatmullRomCurve3(pointList);
  curvePath.add(curve);
  return curvePath;

}

export const SCENE01_CAMERA_LOOKAT01=SCENE01_ORIGIN.clone();
export const SCENE01_CAMERA_LOOKAT02=SCENE01_ORIGIN.clone().add(new THREE.Vector3(0,-10,0));
export const SCENE01_CAMERA_LOOKAT03=SCENE02_ORIGIN.clone();

export const SCENE01_CAMERA_POSITION01=SCENE01_CAMERA_LOOKAT01.clone().add(pz5);
export const SCENE01_CAMERA_POSITION02=SCENE01_CAMERA_LOOKAT02.clone().add(pz5);
export const SCENE01_CAMERA_POSITION03=SCENE01_CAMERA_LOOKAT03.clone().add(pz5);


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

export const SCENE02_CAMERA_LOOKAT01=SCENE02_ORIGIN.clone();
export const SCENE02_CAMERA_LOOKAT02=SCENE02_ORIGIN.clone();
export const SCENE02_CAMERA_LOOKAT03=SCENE02_ORIGIN.clone();

export const SCENE02_CAMERA_POSITION01=SCENE02_CAMERA_LOOKAT01.clone().add(pz5);
export const SCENE02_CAMERA_POSITION02=SCENE02_CAMERA_LOOKAT02.clone().add(px5);
export const SCENE02_CAMERA_POSITION03=SCENE02_CAMERA_LOOKAT03.clone().add(mz5);


export const SCENE02_LOOKAT_CURVEPATH:THREE.CurvePath<THREE.Vector3>=makeCurvePath([
  SCENE02_CAMERA_LOOKAT01,
  SCENE02_CAMERA_LOOKAT02,
  SCENE02_CAMERA_LOOKAT03,
]);

export const SCENE02_POSITION_CURVEPATH:THREE.CurvePath<THREE.Vector3>=makeCurvePath([
  SCENE02_CAMERA_POSITION01,
  SCENE02_CAMERA_POSITION02,
  SCENE02_CAMERA_POSITION03,
]);
