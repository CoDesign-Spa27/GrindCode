import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import { Footer } from './footer'
import { Providers } from "./provider";
import { Header } from "./header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GrindCode",
  description: "An App where you grind code with randoms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>  
      <Providers >
        <Toaster />
        <NextTopLoader  
        color=" #D95BFF"
        showSpinner={true}
       
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
       
        showAtBottom={false}
        />
         {/* <Header /> */}
        
        {children}
        {/* <Footer /> */}
              </Providers>
       </body>
    </html>
  );
}
