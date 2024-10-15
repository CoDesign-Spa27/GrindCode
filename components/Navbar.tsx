import Link from 'next/link'
import React from 'react'
import Logo from '@/public/code.svg'
import '../app/_styles/index.css';
import { signIn } from 'next-auth/react';
const Navbar = () => {
  return (
    <div className=' w-full bg-[#020617] p-2 sm:px-20 flex items-center justify-between'>
      <div>
      <Link href="/">
          <div className="font-extrabold flex text-white dark:text-white items-center gap-1 text-xl sm:text-2xl tracking-wide">
            <div className="dark:flex"><Logo /></div> Grind
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Code
            </span>
          </div>
        </Link>
       
      </div>
      <div className='flex items-center'>
        <div>

      <button
      onClick={() => {
        signIn();
      }}
      className="Signin text-white dark:text-white">Signin</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
