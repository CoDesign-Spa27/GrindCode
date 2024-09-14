"use client";
import { Github } from "lucide-react";
import Link from "next/link";
import CodeSvg from "../public/code.svg";
import DarkLogo from "../public/darkLogo.svg";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";

export function Footer() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme || resolvedTheme;

  const LogoSVG = useMemo(() => {
    return theme === "dark" ? <CodeSvg /> : <DarkLogo />;
  }, [theme]);

  if (!mounted) {
    return null;
  }

  return (
    <footer>
      <div className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:gap-2 md:justify-between items-center text-center md:text-left">
          {/* Logo Section */}
          <div className="flex justify-center md:justify-start">
            <Link href="/">
              <div className="font-extrabold flex text-[#020617] dark:text-white items-center gap-1 text-xl sm:text-2xl tracking-wide">
                <div className="dark:flex">{LogoSVG}</div>
                Grind
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Code
                </span>
              </div>
            </Link>
          </div>

          {/* Middle Text */}
          <div className="text-md sm:text-lg md:text-xl font-bold">
            Join GrindCode and Contribute.
          </div>

          {/* GitHub Link */}
          <div className="flex justify-center md:justify-end">
            <Link
              className="flex items-center gap-2"
              href="https://github.com/CoDesign-Spa27/GrindCode"
            >
              <Github className="bg-white p-1 text-black rounded-full sm:w-8 sm:h-8 w-6 h-6" />
              <p className="font-bold sm:text-md text-sm">GITHUB</p>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-blueGray-300" />

        {/* Footer Bottom */}
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2024</span>
              <a
                href="https://www.creative-tim.com/product/notus-js"
                className="text-blueGray-500 hover:text-gray-800"
                target="_blank"
              />
              GrindCode by{" "}
              <a
                href="https://www.creative-tim.com?ref=njs-profile"
                className="text-blueGray-500 hover:text-blueGray-800"
              >
                Sandeep Singh
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
