"use client";

import { Hero } from "@/components/Hero";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Banner1 from "@/components/Landing/Banner1";
import FAQ from "@/components/Landing/FAQ";
import { Footer } from "@/components/Landing/Footer";
import { Tutorial } from "@/components/Landing/Tutorial";
import { motion } from "framer-motion";

export default function LandingPage() {

  const [mounted,setMounted]=useState(false);

  useEffect(()=>{
    setMounted(true);
  },[])
 
  const itemVariants = {
    hidden: { 
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
}
  return (
  <div className="w-full h-full flex flex-col justify-center ">
<div className="">
  <Navbar />
  <Hero />
  </div>
  

   <Banner1 />
    <div className="bg-[#020617]">
    <motion.div
                   variants={itemVariants}
                   initial="hidden"
                   whileInView="visible"
                   transition={{ duration: 0.5, ease: "easeOut" }} 
                   viewport={{ once: true, amount: 0.4 }}
                className='py-5'>
                    <div className='text-2xl md:text-4xl py-2 font-bold text-center'>
                     Tutorial
                    </div>
                    <div className='text-gray-400 text-md text-center'>
                        Get Started with GrindCode in 5 minutes.
                    </div>
                </motion.div>
   <Tutorial />

<FAQ />
<Footer />
    </div>
    </div> 
  );
}
