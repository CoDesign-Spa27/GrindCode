"use client";

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
import { LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";

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
          <DropdownMenuItem onClick={() => signOut({
            callbackUrl:"/"
          })}>
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
  return (
    <header className="dark:bg-gray-900 bg-gray-200 mx-auto px-6 py-2">
      <div className="flex items-center justify-between">
        <Link href="/">
          <div className="font-extrabold text-2xl tracking-wide">
            GrindCode
          </div>
        </Link>
        <div className="flex gap-10 items-center">
      
          <ModeToggle />
          <AccountDropdown />
        </div>
      </div>
    </header>
  );
}
