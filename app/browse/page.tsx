 
import Link from "next/link";
import { RoomCard } from "./room-card";
import { getRooms } from "@/data-access/room";
import { unstable_noStore } from "next/cache";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { BrowseSearchBar } from "./search-bar";

export default async function Browse({searchParams}: {
  searchParams: {
    search:string;
  }
}) {

  unstable_noStore();
  const rooms = await getRooms(searchParams.search);

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="container mx-auto">
      <div className="w-full border-b py-4 flex items-center justify-between"> 
        <h1 className="md:text-4xl text-2xl font-bold text-center py-4">Live Grinding Rooms</h1>
   
    <Link href='/create-room'>
        <Button
        variant="secondary"
        className="flex gap-2 items-center">
            Create room
            <CirclePlus />
        </Button>
    </Link>
 </div>
 <div className="py-4">
 <BrowseSearchBar />
 </div>
       
        <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
      </div>

    </main>
  );
}

