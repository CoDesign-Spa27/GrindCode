'use server'

import {  getSession } from "@/lib/auth";
import {StreamChat} from "stream-chat"
export async function generateTokenAction(){

    const session= await getSession();

    if(!session){
        throw new Error("No Session found")
    }
    const api_key=process.env.NEXT_PUBLIC_STREAM_KEY;

    const api_secret = process.env.NEXT_PUBLIC_STREAM_SECRET;

const serverClient=StreamChat.getInstance(api_key as string, api_secret as string)

    const token=serverClient.createToken(session.user.id)

    return token;
}