"use client";
import { GoogleOauthButton } from "./social-auth";
import Logo from "../Logo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Loader from "../Loader";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import {
  SignInSchema,
  SignInSchemaType,
} from "@/lib/validators/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";

const Signin = () => {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);


  const handleSingInWithCredentials = async (data:SignInSchemaType) => {
    setError("");
    try {
      const result = await signIn("credentials", {
        redirect: false,
        ...data
      });

      if (result?.ok) {
        toast({
          title: "Sign in successful",
          variant: "success",
        });
        router.push("/dashboard");
      }
      if (result?.error) {
        setError(result.error);
        toast({
          title: error,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log(err);
    } 
  };

  const handleSignInWithGoogle = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const result = await signIn("google");
      if (result?.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during Google sign-in");
    }
  };

  return (
    <div className="relative w-full max-w-xl overflow-hidden z-10 bg-gray-800 py-10 px-5 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12  gap-5">
      <div className="flex flex-col gap-5 ">
        <Logo />
        <div className="flex flex-col gap-5 justify-center rounded-3xl py-5 px-10">
          <div className="text-3xl text-center font-black">Welcome!</div>
          <div className="text-xl font-mono text-center">
            Please Sign in to continue
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSingInWithCredentials)}>
          <div className="mb-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-300">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 focus:border-[#37B5ED] rounded-md text-white"
                        placeholder=""
                        type="email"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
                />
                </div>
            
<div className="mb-4">

              <FormField
              
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-300">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 focus:border-[#37B5ED] rounded-md text-white"
                        placeholder=""
                        type="password"
                        />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
                />
                </div>
              <div className="flex justify-end">
                <button
                 disabled={form.formState.isSubmitting}
                  className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                  type="submit"
                >
                {form.formState.isSubmitting ? "Please Wait...." : "Sign In"}
                </button>
              </div>
            </form>
          </Form>
          <Separator className="bg-gray-500" />
          <div>
            <GoogleOauthButton
              handleSignIn={(e) => handleSignInWithGoogle(e)}
              label="Sign in with Google"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
