"use client";
import CodeSvg from "../public/code.svg";
import DarkLogo from "../public/darkLogo.svg";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, MenuIcon, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FloatingBar } from "../components/FloatingBar";
import { useTheme } from "next-themes";

export function AccountDropdown() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  if (status === "loading") {
    return <Button>Loading...</Button>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {isLoggedIn ? (
          <Avatar>
            <AvatarImage
              className="md:w-12 md:h-12 w-10 h-10 rounded-full"
              src={session.user.image || ""}
              alt="Profile"
            />
            <AvatarFallback>{session.user.name}</AvatarFallback>
          </Avatar>
        ) : (
          <Button>Sign In</Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isLoggedIn ? (
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            <LogOut className="m-2 w-4" />
            Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signIn("google")}>
            Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const { theme, resolvedTheme } = useTheme();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

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
    <header className="bg-[#E5E7EB] dark:bg-[#020617] mx-auto px-6 py-2">
      <div className="flex items-center justify-between">
        <Link href="/">
          <div className="font-extrabold flex text-[#020617] dark:text-white items-center gap-1 text-2xl tracking-wide">
            <div className="dark:flex">{LogoSVG}</div> Grind
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Code
            </span>
          </div>
        </Link>

        <div className="sm:flex hidden justify-between gap-30 items-center">
          <nav>
            {isLoggedIn && (
              <div className="flex gap-2">
                <Link
                  className="dark:text-white text-black hover:text-black hover:bg-white font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2  dark:hover:bg-gray-100 dark:hover:text-black  transition-all duration-300 ease-out"
                  href="/your-rooms"
                >
                  My Rooms
                </Link>

                <Link
                  className="dark:text-white text-black hover:text-black hover:bg-white font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2  dark:hover:text-black  transition-all duration-300 ease-out dark:hover:bg-gray-100 "
                  href="/browse"
                >
                  Browse
                </Link>
              </div>
            )}
          </nav>

          <div className=" hidden sm:flex gap-10 items-center">
            <ModeToggle />
            <AccountDropdown />
          </div>
        </div>

        <div className="px-2 sm:hidden">
          <ModeToggle />
        </div>
      </div>

      <div className="sm:hidden fixed right-5 bottom-0 top-[30%] z-50">
        <FloatingBar />
      </div>
    </header>
  );
}
