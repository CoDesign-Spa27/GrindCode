import { getUserRooms } from "@/data-access/room";
import Link from "next/link";
import { UserRoomCard } from "./user-room-card";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { unstable_noStore } from "next/cache";

export default async function YourRoomPage() {
  unstable_noStore();
  const items = await getUserRooms();
 
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="container mx-auto">
        <div className="w-full border-b py-4 flex items-center justify-between">
          <h1 className="md:text-4xl text-2xl font-bold text-center py-4">
            Your Grinding Rooms
          </h1>

       
        </div>

        <div className="grid md:grid-cols-3 py-4  gap-4">
          {items.map((room) => (
            <UserRoomCard key={room.id} room={room} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="flex flex-col gap-4 justify-center items-center mt-24">
            <div className="flex justify-center mt-4">
              <img
                src="/computer.gif"
                className=" h-32 w-32"
                alt="Example GIF"
              />
            </div>
            <h2 className="text-2xl">You have no rooms !</h2>

            <Button asChild>
              <Link href="/create-room">Create Room</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
