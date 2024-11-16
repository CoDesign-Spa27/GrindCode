import Link from 'next/link'
import React from 'react'
import '../app/_styles/index.css';
import { signIn } from 'next-auth/react';
import Logo from './Logo';
import GithubStarsButton from './ui/GithubStarsButton';
const Navbar = () => {
  return (
    <div className=' w-full bg-[#020617] p-2 sm:px-20 flex items-center justify-between'>
      <div>
   <Logo/>
       
      </div>
      <div className='flex items-center gap-5'>
        <div>
        <GithubStarsButton />
        </div>
        <div className='sm:block hidden'>
      <button
      onClick={() => {
        signIn();
      }}
      className="Signin  text-white dark:text-white">Signin</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
