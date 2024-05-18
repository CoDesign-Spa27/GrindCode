"use client"
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
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";

  
export function AccountDropdown(){
  const session=useSession();

  const isLoggedIn=!!session.data

 return  <DropdownMenu >
  <DropdownMenuTrigger> {isLoggedIn ?(   <Avatar>
      <AvatarImage className="md:w-12 md:h-12 w-10 h-10 rounded-full" src={session.data.user.image || ""} alt="Profile" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar> 
 
  ):(
  <div> SignIn</div>
 )}</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />

    { isLoggedIn ? (
      <DropdownMenuItem onClick={()=>signOut()}><LogOut className="m-2  w-4" />Signout</DropdownMenuItem>
    ):(
      <DropdownMenuItem onClick={()=> signIn('google')}>SignIn</DropdownMenuItem>

    )}
    
  </DropdownMenuContent>
</DropdownMenu>

}

export function Header(){
 return <header className="dark:bg-gray-900 bg-gray-200 mx-auto px-6 py-2">
  <div className="flex items-center justify-between ">
 <Link href="/">
 <div className="font-extrabold text-2xl tracking-widest">CodeForge</div>
 </Link>



<div className="flex gap-10 items-center">
 


<div className="items-center">
<AccountDropdown />
   
</div>

<div className="">
  <ModeToggle />
</div>
</div>

  </div>
  
 
 </header>
}