"use client";

import { Hero } from "@/components/Hero";
import { LightHero } from "@/components/LightHero";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function LandingPage() {

  const [mounted,setMounted]=useState(false);
  const { theme } = useTheme();

  useEffect(()=>{
    setMounted(true);
  },[])
if(!mounted){
  return null
}
  return <>{theme == "dark" ? <Hero /> : <LightHero />}</>;
}
