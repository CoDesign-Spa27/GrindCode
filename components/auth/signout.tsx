"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Logout from '@/public/logout.svg'
function SignOut() {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="relative overflow-hidden z-10 bg-gray-800 py-10 px-5 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12  gap-5">
      <div className="flex flex-col items-center justify-center gap-4">
        <div >
            <Logout />
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <div className="text-xl font-medium">Oh, no! You&apos;re leaving..</div>
          <div>Are you sure?</div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Button 
          className="bg-purple-400 text-white hover:bg-purple-600"
          onClick={() => router.push("/dashboard")}>
            Naah, Just Kidding
          </Button>
          <Button
          variant={"secondary"}
          className="border-purple-400 border hover:text-purple-400"
          onClick={handleSignOut}>Yes, Log me Out</Button>
        </div>
      </div>
    </div>
  );
}

export default SignOut;
