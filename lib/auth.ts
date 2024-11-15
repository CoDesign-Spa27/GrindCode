import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AuthOptions, DefaultSession, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { SignInSchema } from "./validators/auth.validator";
import bcrypt  from "bcryptjs";
import { users } from "@/db/schema";
import { ErrorHandler } from "./error";
declare module "next-auth" {
    interface Session extends DefaultSession {
      user: {
        id: string;
      } & DefaultSession["user"];
    }
  }

export const authConfig={
adapter:DrizzleAdapter(db) as Adapter,
session: {
    strategy: "jwt",
  },
providers:[
     Google({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
      
      }),
      Credentials({
        name:"Credentials",
        credentials:{
          email: { label: 'Email', type: 'email', placeholder: 'email' },
          password: { label: 'password', type: 'password' },
        },
        async authorize(credentials):Promise<any>{
          const result = SignInSchema.safeParse(credentials);
          if(!result.success){ 
            throw new ErrorHandler(
              'Input Validation failed',
              'VALIDATION_ERROR',
              {
                fieldErrors: result.error.flatten().fieldErrors,
              }
            );
          }
const {email,password} = result.data;
let user = await db.query.users.findFirst({
  where: (users, { eq }) => eq(users.email, email),
  columns: {
    id: true,
    email: true,
    password: true,
    name: true,
    image: true,
  }
});
if(!user){
  const hashPassword=await bcrypt.hash(password,10);
  const newUser =await db.insert(users).values({
    email,
    password:hashPassword,
    name: email.split("@")[0],
  }).returning({   
    id: users.id,
    email: users.email,
    name: users.name,
    image: users.image,
    password: users.password,
  })
  user=newUser[0];
}

if(!user.password){
  throw new ErrorHandler(
    'Password is Incorrect',
    'AUTHENTICATION_FAILED',
  )
}

const isPasswordMatch = await bcrypt.compare(password, user.password);

if(!isPasswordMatch){
throw new ErrorHandler(
  'Password is Incorrect',
  'AUTHENTICATION_FAILED',
)  
}
return {
 id:user.id,
  email:user.email,
  name:user.name,
  image:user.image,
}
        }
      }, 
    )
      
],
callbacks: {
    async jwt({ token, user,trigger }) {
      const dbUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, token.email!),
      });

      if (!dbUser) {
        throw new Error("no user with email found");
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ token, session }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name,
          email: token.email,
          image: token.picture,
        };
      }

      return session;
    },
  },
  pages:{
    signIn:'/signin',
    signOut:'/signout'
  },
  
}satisfies AuthOptions;

export function getSession(){
   return getServerSession(authConfig);
}