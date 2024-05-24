"use client"

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Balancer from 'react-wrap-balancer'

export default function LandingPage(){
    return  <main>
    {/* <div className="flex justify-center bg-gradient-to-r from-rose-200 to-teal-200 dark:bg-gradient-to-r dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 gap-y-20 items-center flex-col w-full min-h-screen">
      <div className="flex flex-col items-center justify-between">
        <div className="md:text-7xl text-center text-4xl font-extrabold">
        Grinding Code{" "}
        <span className="text-xl">with</span>
          <span className="md:text-5xl font-extrabold dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-l dark:from-gray-500 dark:via-green-300 dark:to-zinc-500 inset-x-0 bottom-0 h-px bg-gradient-to-r from-sky-500/0 via-purple-400/70 to-sky-500/0">
            {" "}
            Realms!
          </span>
        </div>
        <div className="py-8 text-center px-5 md:text-lg">
          Code Together, Innovate Forever: Join Tech-Savvy Rooms for Every
          Stack!
        </div>
      </div>
      <div>
        <Link href="/create-room">
          <button className="hidden dark:block" id="create-room-button-dark">
            Get Started
          </button>
        </Link>
        <Link href="/create-room">
          <button className="block dark:hidden" id="create-room-button-light">
            Get Started
          </button>
        </Link>
      </div>
    </div> */}
  <section
      id="hero-section"
      aria-label="hero section"
      className="mt-16 w-full md:mt-48"
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
          <Link
            href="/your-rooms"
            className={cn(
              buttonVariants({ size: "lg" }),
              "transition-all duration-1000 ease-out md:hover:-translate-y-2"
            )}
          >
            Get Started
          </Link>

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