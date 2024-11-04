'use server'

import { editRoom, getRoom } from "@/data-access/room";
import { Room} from "@/db/schema";
import { redirect } from 'next/navigation'
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function editRoomAction(roomData:Omit<Room,"userId" >) {
    const session=await getSession();

    if(!session){
        throw new Error("User not authenticated")
    }
const room=await getRoom(roomData.id)
if(room?.userId !== session.user.id){
throw new Error("User not authorized");

}
await editRoom({ ...roomData, userId:room.userId  });

    revalidatePath("/your-rooms")
    revalidatePath(`/edit-room/${roomData.id}`)

    redirect('/your-rooms')

  }
  