import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import Balancer from "react-wrap-balancer";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const LightHero = () => {
    const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%,#E5E7EB 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-[#E5E7EB] px-4 py-24 text-gray-900"
    >
      <div className="relative z-10 flex flex-col text-center items-center">
        <h1 className="animate-fade-up font-urbanist text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <Balancer>
              Fast Track Your Coding With{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text font-extrabold text-transparent">
                Grind Code
              </span>
            </Balancer>
          </h1>

        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
        Code Together, Innovate Forever: Join Tech-Savvy Rooms for Every
        Stack!
        </p>
        <div className="z-10 flex animate-fade-up flex-col justify-center gap-4 sm:flex-row">
            {isLoggedIn ? (
              <Link
                href="/create-room"
                >
                    <motion.button
                     style={{
                        border,
                        boxShadow,
                      }}
                      whileHover={{
                        scale: 1.015,
                      }}
                      whileTap={{
                        scale: 0.985,
                      }}
                      className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/90 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/70"
                    >
                Create Room

                    </motion.button>
              </Link>
            ) : (
              <motion.button
              style={{
                border,
                boxShadow,
              }}
              whileHover={{
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.985,
              }}
              className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/90 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/70"
                onClick={() => {
                  signIn();
                }}
                
              >
                Sign in
              </motion.button>
            )}

            <Link
              href="https://github.com/CoDesign-Spa27/Codeforge"
              target="_blank"
              >
                <motion.button
                       style={{
                        border,
                        boxShadow,
                      }}
                      whileHover={{
                        scale: 1.015,
                      }}
                      whileTap={{
                        scale: 0.985,
                      }}
                      className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/90 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/70"
                >

              See on GitHub
                </motion.button>
            </Link>
          </div>
      </div>

      <div className="absolute  inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
};