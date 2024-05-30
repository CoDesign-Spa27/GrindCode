"use client";
import CodeSvg from '../public/code.svg'

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
import { useState } from 'react';


export function AccountDropdown() {

  const { data: session, status } = useSession();
  const isLoggedIn = status ==="authenticated";


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

  
const { data: session, status } = useSession();
const isLoggedIn = status ==="authenticated";

const [nav,setNav]=useState(true);

const handleNav=()=>{

  setNav(!nav)


}

  return (
    <header className="bg-gradient-to-r from-rose-200 to-teal-200 dark:bg-gradient-to-r dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 mx-auto px-6 py-2">
      <div className="flex items-center justify-between">
        <Link href="/">
          <div className="font-extrabold flex items-center gap-1 text-2xl tracking-wide">
         <div className='dark:flex hidden'><CodeSvg />   </div> Grind<span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Code</span>
          </div>
        </Link>


        <div className='sm:flex hidden justify-between gap-30 items-center' >
        <nav>

          {isLoggedIn && 
         (   
        
         <div className='flex gap-2'>
           <Link
            className="dark:text-white hover:bg-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2    dark:hover:bg-gray-100 dark:focus:ring-gray-700 transition-all duration-300 ease-out dark:border-gray-700 dark:hover:text-black"
            href="/your-rooms">
             My Rooms
            </Link> 

          <Link
          className='dark:text-white  hover:bg-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:hover:text-black  transition-all duration-300 ease-out dark:hover:bg-gray-100 dark:focus:ring-gray-700 dark:border-gray-700'
          href="/browse">
            Browse
          </Link>  
         </div>
          )
          }
        
        </nav>



        <div className=" hidden sm:flex gap-10 items-center">
      
          <ModeToggle />
          <AccountDropdown />
        </div>

        </div>

        <div className=' sm:hidden'>
  <ModeToggle />
</div>

        <div className='sm:hidden flex flex-col'>

        <div onClick={handleNav} className='block md:hidden'>
    {!nav ? <X size={23}/> : <MenuIcon size={23} />}
   </div>
   <div className={!nav ?'fixed left-0 top-0 z-50 w-[60%] h-[100%] bg-gradient-to-b from-rose-200 to-teal-200 border-r-gray-900 ease-in-out duration-500 dark:bg-gradient-to-b dark:from-slate-900 dark:via-purple-950 dark:to-slate-900':'fixed left-[-100%]'}>
    <div className='pl-5 flex items-center font-semibold gap-2 pt-3 border-b-2 pb-3'>
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
          <h1>Please Sign in</h1>
        )}
        {session?.user.name}
        </div>
   <div className='flex pt-5 gap-8 pl-5 flex-col capitalize font-bold text-xl' >   
     {isLoggedIn &&
     
     (
      <div className='flex flex-col
      gap-5
      '>
        <Link href="/your-rooms">
      <div className='hover:underline'>Your rooms</div>
      </Link>

<Link href='/browse'>
<div className='hover:underline'>Browse</div> 

</Link>
      </div>
      
    )
       }
 <div>
 {isLoggedIn ? (
          <Button onClick={() => signOut({
            callbackUrl:"/"
          })}>
            <LogOut className="m-2 w-4" />
            Sign Out
          </Button>
        ) : (
          <Button onClick={() => signIn("google")}>
            Sign In
          </Button>
        )}
  </div>   
      </div>
   </div>
        </div>
      </div>
      
    </header>
  );
}
