'use server'

import { Room, db,room } from "@/db/schema";
 
import { getSession } from "../../lib/auth";
import { revalidatePath, unstable_noStore } from "next/cache";
import { createRoom } from "@/data-access/room";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  unstable_noStore();
    const session =await getSession();
   
 
    if (!session) {
      console.log("You must provide a session");
      return;  
    }
 
   await createRoom(roomData,session.user.id)

   revalidatePath("/")
    
  }
  