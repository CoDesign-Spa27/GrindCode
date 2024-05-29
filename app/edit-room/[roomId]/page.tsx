import { getRoom } from "@/data-access/room";
import { EditRoomForm } from "./edit-room";
import { unstable_noStore } from "next/cache";

export  default async function EditRoomPage({
    params,
  }: {
    params: { roomId: string };
  }){
unstable_noStore();
const room=await getRoom(params.roomId)

if (!room) {
    return <div>Room not found</div>;
  }

    return <div className="container mx-auto flex flex-col gap-2 pt-12 pb-12">
        <h1 className="text-3xl font-bold py-1">
            Edit Room
        </h1>
        <EditRoomForm room={room} />
    </div>
}