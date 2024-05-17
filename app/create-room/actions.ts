'use server'

import { Room, db,room } from "@/db/schema";
 
import { getSession } from "../../lib/auth";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
    const session =await getSession();
   
 
    if (!session) {
      console.log("You must provide a session");
      return;  
    }
 
    console.log(session?.user.id)
      const inserted = await db
      .insert(room)
      .values({ ...roomData,userId:session.user.id })
      .returning();
    return inserted[0];
    
  }
  