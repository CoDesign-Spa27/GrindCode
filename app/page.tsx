"use client";

import { Hero } from "@/components/Hero";
import { LightHero } from "@/components/LightHero";
import { Loader } from "@/components/Loader";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


export default function LandingPage() {

  const [mounted,setMounted]=useState(false);
  const { theme } = useTheme();

  useEffect(()=>{
    setMounted(true);
  },[])
if(!mounted){
  return (
   <div className="h-screen w-full flex items-center justify-center bg-[#020617]">
  
   

  </div>
);
}
  return (
  <>{theme == "dark" ? <Hero /> : <LightHero />}</> 
  );
}
