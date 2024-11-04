"use client"

import * as React from "react"
import { useState,useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-2 md:pl-3 md:pr-3.5 py-2 md:py-1.5 transition-colors relative z-10"; 

export function ModeToggle(){

  const { setTheme,theme,resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false);
 
  useEffect(() => {
    setMounted(true);
  }, []);
 
  const currentTheme = theme || resolvedTheme;

  if (!mounted) {
  
    return null;
  }

return   <div className="relative flex w-fit items-center rounded-full">
  <button
  className={`${TOGGLE_CLASSES} ${
    theme === "light" ? "text-white" : "text-slate-300"
  }`}
  onClick={() => setTheme("light")}>
<Sun className="relative z-10 text-lg md:text-sm" />
  </button>

  <button
  className={`${TOGGLE_CLASSES} ${
   theme === "dark" ? "text-white" : "text-slate-800"
  }`}
  onClick={() => setTheme("dark")}>
<Moon className="relative z-10 text-lg md:text-sm" />
  </button>

  <div
        className={`absolute inset-0 z-0 flex ${
          theme === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
        />
      </div>
</div>
}