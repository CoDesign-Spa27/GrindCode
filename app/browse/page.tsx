 
import Link from "next/link";
import { RoomCard } from "./room-card";
import { getRooms } from "@/data-access/room";
import { unstable_noStore } from "next/cache";

export default async function Browse({searchParams}: {
  searchParams: {
    search:string;
  }
}) {

  unstable_noStore();
  const rooms = await getRooms(searchParams.search);

  return (
    <main className="flex flex-col items-center justify-between">
        <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}

