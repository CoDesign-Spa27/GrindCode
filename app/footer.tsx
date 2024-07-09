import { Github, Twitter } from "lucide-react";
import Link from "next/link";

 

export function Footer(){
return <div>
    <footer className="relative py-5">
  <div className="container mx-auto px-4">
     <div className="flex justify-between items-center">
        <div className="sm:text-3xl  text-md  font-bold">
           Join GrindCode and Contribute. 
        </div>
        <div className="flex gap-5">
          <Link className="flex items-center gap-2" href='https://github.com/CoDesign-Spa27/GrindCode'>
          <Github className="bg-white p-1 text-black rounded-full sm:w-8 sm:h-8 w-5 h-5" />
           <p className="font-bold sm:text-md text-sm">GITHUB</p>
          </Link>
          
        </div>
     </div>
    <hr className="my-6 border-blueGray-300"/>
    <div className="flex flex-wrap items-center md:justify-between justify-center">
      <div className="w-full md:w-4/12 px-4 mx-auto text-center">
        <div className="text-sm text-blueGray-500 font-semibold py-1">
          Copyright © <span id="get-current-year">2024</span><a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank"/> GrindCode by 
          <a href="https://www.creative-tim.com?ref=njs-profile" className="text-blueGray-500 hover:text-blueGray-800"> Sandeep Singh</a>.
        </div>
      </div>
    </div>
  </div>
</footer>
</div>
}