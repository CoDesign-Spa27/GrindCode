 
import Link from "next/link";
import { RoomCard } from "./room-card";
import { getRooms } from "@/data-access/room";
import { Room } from "./room-card";
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
  // @ts-ignore
  const rooms:Room[] = await getRooms(searchParams.search);

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="container mx-auto">
      <div className="w-full border-b py-4 flex items-center justify-between"> 
        <h1 className="md:text-4xl text-2xl font-bold text-center py-4">Live Grinding Rooms</h1>
 </div>
 <div className="py-4">
 <BrowseSearchBar />
 </div>
       
 {rooms.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <p>No rooms found.</p>  
        )}
      </div>

    </main>
  );
}

