"use client";

import { Hero } from "@/components/Hero";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function LandingPage() {

  const [mounted,setMounted]=useState(false);

  useEffect(()=>{
    setMounted(true);
  },[])
 
  return (
  <div className="h-screen w-full flex flex-col justify-center">
  <Navbar />
   <Hero />
    </div> 
  );
}
