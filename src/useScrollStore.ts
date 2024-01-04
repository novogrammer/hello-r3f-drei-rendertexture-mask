import {create} from "zustand";

interface ScrollState{
  section01Height:number;
  setSection01Height:(section01Height:number)=>void;
  section02Height:number;
  setSection02Height:(section02Height:number)=>void;
}

export const useScrollStore = create<ScrollState>((set)=>({
  section01Height:10000,
  setSection01Height:(section01Height:number)=>set(()=>({section01Height})),
  section02Height:10000,
  setSection02Height:(section02Height:number)=>set(()=>({section02Height})),
}));