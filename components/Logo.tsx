import Link from 'next/link'
import React from 'react'
import LogoSvg from '@/public/code.svg'
const Logo = () => {
  return (
    <div>
         <Link href="/">
          <div className="font-extrabold flex text-white dark:text-white items-center gap-1 text-xl sm:text-2xl tracking-wide">
            <div className="dark:flex"><LogoSvg /></div> Grind
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Code
            </span>
          </div>
        </Link>
    </div>
  )
}

export default Logo
