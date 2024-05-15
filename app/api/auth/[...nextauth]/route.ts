import { Providers } from '@/app/provider';
import { db } from '@/db'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import Google from 'next-auth/providers/google';
import GoogleProvider from "next-auth/providers/google";

const  handler =NextAuth({
 
adapter:DrizzleAdapter(db) as Adapter,
 
providers:[
     Google({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
      
      })
],
 
})

export { handler as GET , handler as POST}

 