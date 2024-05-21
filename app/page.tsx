import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { getRooms } from "@/data-access/room";
import { Room } from "@/db/schema";
import { Github } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  // Fetching the rooms data from the database
  const items = await getRooms();

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="flex justify-center bg-gradient-to-r from-rose-200 to-teal-200 dark:bg-gradient-to-r dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 gap-y-20 items-center flex-col w-full min-h-screen">
        <div className="flex flex-col items-center justify-between">
          <div className="md:text-7xl text-center text-4xl font-extrabold">
            Forge Code{" "}
            <span className="md:text-5xl font-extrabold dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-l dark:from-gray-500 dark:via-green-300 dark:to-zinc-500 inset-x-0 bottom-0 h-px bg-gradient-to-r from-sky-500/0 via-purple-400/70 to-sky-500/0">
              {" "}
              Realms!
            </span>
          </div>
          <div className="py-8 text-center text-lg">
            Code Together, Innovate Forever: Join Tech-Savvy Rooms for Every
            Stack!
          </div>
        </div>
        <div>
          <Link href="/create-room">
            <button className="hidden dark:block" id="create-room-button-dark">
              Create room
            </button>
          </Link>
          <Link href="/create-room">
            <button className="block dark:hidden" id="create-room-button-light">
              Create room
            </button>
          </Link>
        </div>
      </div>
       <div className="container mx-auto">
        <h1 className="md:text-4xl text-2xl font-bold text-center py-4">Live Forges</h1>
        <div className="grid md:grid-cols-3  gap-4">
          {items.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
        </div>
    </main>
  );
}

function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>
          {room.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {room.githubRepo && (
          <Link
          target="blank"
          rel="noopener noreferrer"
          href={room.githubRepo || ""}>
            <Github />
          </Link>
        )}
        
      </CardContent>
      <CardContent>
      <p>{room.tags}</p>
      </CardContent>
      <CardFooter>
        <Button asChild><Link
        href={`/room/${room.id}`}
        >Join Room</Link></Button>
      </CardFooter>
    </Card>
  );
}
