"use client"
import { useState } from "react";
import NextTopLoader from "nextjs-toploader";
import { Sidenav } from "../_components/Sidenav";
import { Providers } from "../provider";
import { Toaster } from "@/components/ui/toaster";
import { ModeToggle } from "@/components/mode-toggle";
import { FiMenu } from "react-icons/fi";  

export default function Layout({ children }: { children: React.ReactNode }) {
 
  const [sidebarOpen, setSidebarOpen] = useState(false);

 
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Providers>
<div>

      <div className="md:hidden fixed top-4 left-4 z-20">
        <button onClick={toggleSidebar} aria-label="Open Sidebar">
          <FiMenu className="text-2xl" />
        </button>
      </div>

      <div className="flex h-screen md:flex-row md:overflow-hidden">
       
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-950 transform transition-transform ease-in-out duration-300 md:relative md:w-56 md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidenav />
        </div>
 
        {sidebarOpen && (
          <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar} // Close sidebar when clicking outside of it
          />
        )}

      
        <div className="flex-grow p-4 md:overflow-y-auto md:px-12">
    
          <div className="flex justify-end">
            <ModeToggle />
          </div>
          {children}
        </div>
      </div>
        </div>
    </Providers>
  );
}
