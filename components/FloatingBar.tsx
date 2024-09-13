import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
} from "@tabler/icons-react";
import Image from "next/image";
import { AppWindow, FileSearch, LogIn, LogOut, User2 } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export function FloatingBar() {
    
  const { data: session, status } = useSession();
  const isLoggedIn = status ==="authenticated";
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "Your rooms",
      icon: (
        <AppWindow className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/your-rooms",
    },
    {
      title: "Browse",
      icon: (
        <FileSearch className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/browse",
    },
    {
      title: "Profile",
      icon:( <DropdownMenu>
        <DropdownMenuTrigger><User2  className="h-full w-full text-neutral-500 dark:text-neutral-300" /></DropdownMenuTrigger>
        <DropdownMenuContent>
          {
            isLoggedIn ? (
              <Avatar className="flex p-2 gap-2">
              <AvatarImage
                className=" w-8 h-8 rounded-full"
                src={session.user.image || ""}
                alt="Profile"
              />
              <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
            </Avatar>
            ):(
              
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
            )
          }
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
      ),
      href: "#",
    }  
  ];
  return (
    <div className="flex items-center justify-center h-[35rem] w-full">
      <FloatingDock
        mobileClassName="translate-y-20" 
        items={links}
      />
    </div>
  );
}
