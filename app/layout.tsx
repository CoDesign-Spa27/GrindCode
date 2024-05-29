import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
 
import { Providers } from "./provider";
import { Header } from "./header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeForge",
  description: "Generated by create next app",
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
        <NextTopLoader  
        color=" #D95BFF"
        showSpinner={true}
        crawlSpeed={250}
       
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
       
        showAtBottom={false}
        />
         <Header />
        {children}

      </Providers>
       </body>
    </html>
  );
}
