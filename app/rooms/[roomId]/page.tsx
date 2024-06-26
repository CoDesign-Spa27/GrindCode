import { TagList } from "@/components/tags-list";
import { getRoom } from "@/data-access/room";
import { Link, Github } from "lucide-react";
import { GrindCodeVideo } from "./video-player";
import ChatComponent from "@/components/chat/ChatComponent";

export default async function RoomPage({ params }: { params: { roomId: string } }) {
  const { roomId } = params;

  const room = await getRoom(roomId);

  if (!room) {
    return (
      <div>
        <h1>No room of this Id found</h1>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-4 grid-cols-1 min-h-full">
      <div className="sm:col-span-3 col-span-1 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <GrindCodeVideo room={room} />
        </div>

        <h1 className="text-3xl hidden sm:block text-center font-bold py-5">
          Room details
        </h1>
        <div className="rounded-lg hidden border bg-card text-card-foreground shadow-sm my-3 p-4 sm:flex flex-col gap-4">
          <h1 className="font-bold capitalize text-xl">{room?.name}</h1>
          <p className="text-base text-gray-400">{room?.description}</p>

          <h1>Tags:</h1>
          <TagList tags={(room.tags)!}/>
          <div className="flex text-center text-sm gap-2">
            {room?.githubRepo && (
              <Link target="_blank" href={room.githubRepo || ""}>
                <Github />
              </Link>
            )}
            Github
          </div>
        </div>
      </div>

      <div className="sm:col-span-1 col-span-1 p-4 pl-2 flex flex-col">
        <div className="flex-grow">
          <ChatComponent room={room} />
        </div>
      </div>
    </div>
  );
}
