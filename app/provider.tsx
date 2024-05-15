"use client";
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { ReactNode } from "react";

interface Props{
  children:ReactNode
}


export function Providers(props:Props) {
    return <SessionProvider >
    <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
           
          {props.children}
        </ThemeProvider>
    </SessionProvider>
}