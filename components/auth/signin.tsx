"use client";
import { GoogleOauthButton } from "./social-auth";
import Logo from "../Logo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import  Loader from "../Loader";

 const Signin = () => {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
     
  },[])
  useEffect(() => {
    
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

   if (status === "loading" || !isMounted) {
    return <Loader />;
  }
  return (
    <div className="relative overflow-hidden z-10 bg-gray-800 py-10 px-5 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12  gap-5">
      <div className="flex flex-col gap-5 items-center">
        <Logo />
        <div className="flex flex-col gap-5 justify-center items-center rounded-3xl py-5 px-10">
          <div className="text-3xl font-black">Welcome!</div>
          <div className="text-xl font-mono text-center">
            Please Sign in to continue
          </div>
          <div>
            <GoogleOauthButton label="Sign in with Google" />
          </div>
        </div>
      </div>
    </div>
  );
};


export default Signin;