"use client"

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Balancer from 'react-wrap-balancer'
 

export default function LandingPage(){
  
  const { data: session, status}=useSession();

  const isLoggedIn=status==="authenticated"


    return  <main className="bg-gradient-to-r w-full min-h-screen from-rose-200 to-teal-200 dark:bg-gradient-to-r dark:from-slate-900 dark:via-purple-950 dark:to-slate-900">
    
  <section
      className="pt-16 w-full  md:pt-48"
    >
 
      
            <div className="container flex flex-col items-center gap-6 text-center">
         
        
        <h1
        className="animate-fade-up font-urbanist text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          <Balancer> 
          Fast Track Your Coding With{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text font-extrabold text-transparent">
              Grind Code
            </span>
          </Balancer>
        </h1>

        <h3 className="max-w-[42rem] animate-fade-up text-muted-foreground sm:text-xl sm:leading-8">
          <Balancer>
          Code Together, Innovate Forever: Join Tech-Savvy Rooms for Every
          Stack!
          </Balancer>
        </h3>

        <div className="z-10 flex animate-fade-up flex-col justify-center gap-4 sm:flex-row">


          {isLoggedIn ? (
               <Link
               href="/create-room"
               className={cn(
                 buttonVariants({ size: "lg" }),
                 "transition-all duration-1000 ease-out md:hover:-translate-y-2"
               )}
             >
               Create Room
             </Link>
          ):(
            <Button
            onClick={()=>{
              signIn()
            }}
            className={cn(
              buttonVariants({ size: "lg" }),
              "transition-all duration-1000 ease-out md:hover:-translate-y-2"
            )}
          >
            Sign in
          </Button>
          )}
           

          <Link
            href='https://github.com/CoDesign-Spa27/Codeforge'

            target="_blank"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "transition-all duration-1000 ease-out md:hover:-translate-y-2"
            )}
          >
            See on GitHub
          </Link>
        </div>
      </div>
    </section>
    </main>
}