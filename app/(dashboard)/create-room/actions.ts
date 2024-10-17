'use server'

import { Room} from "@/db/schema";
 
import { getSession } from "../../../lib/auth";
import { revalidatePath } from "next/cache";
import { createRoom } from "@/data-access/room";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
    const session =await getSession();
 
    if (!session) {
      return;  
    }
 
const room = await createRoom(roomData,session.user.id)

   revalidatePath("/browse")
   
   return room;

  }
  