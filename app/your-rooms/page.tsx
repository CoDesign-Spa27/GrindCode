import { getRooms, getUserRooms } from "@/data-access/room";
import Link from "next/link";
import { SearchBar } from "../browse/search-bar";
import { UserRoomCard } from "@/app/your-rooms/user-room-card";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { unstable_noStore } from "next/cache";

export default async function YourRoomPage() {
  // Fetching the rooms data from the database
  unstable_noStore();

  const items = await getUserRooms();

  return (
    <main className="flex flex-col items-center justify-between">
       
       <div className="container mx-auto">
        <div className="w-full border-b py-4 flex items-center justify-between"> 
        <h1 className="md:text-4xl text-2xl font-bold text-center py-4">Your Grinding Rooms</h1>
   
    <Link href='/create-room'>
        <Button className="flex gap-2 items-center">
            Create room
            <CirclePlus />
        </Button>
    </Link>
 </div>
 <div className="py-4">
 <SearchBar />
 </div>
        <div className="grid md:grid-cols-3  gap-4">
          {items.map((room) => (
            <UserRoomCard key={room.id} room={room} />
          ))}
        </div>
        </div>
    </main>
  );
}

