 
import { getRoom } from "@/data-access/room";
 
import EnterPin from "@/components/EnterPin";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default async function RoomPage({ params }: { params: { roomId: string } }) {
  const { roomId } = params;
  const room = await getRoom(roomId);

  if (!room) {
    return (
      <div>
        <h1>No room with this ID found</h1>
      </div>
    );
  }

  return (
    <div  >
      <div className="pt-2 pl-4 ">
        <Link href={"/dashboard"} >
        <div className="flex items-center gap-2 border-2 rounded-full w-20 ">

        <ArrowLeftIcon className="bg-gradient-to-br from-pink-400 to-purple-400 rounded-full w-7 h-7 p-1 text-white" />
        <p className="font-bold">
          Exit
          </p> 
        </div>
        </Link>
      </div>
      <EnterPin room={room} />
    </div>
  );
}
