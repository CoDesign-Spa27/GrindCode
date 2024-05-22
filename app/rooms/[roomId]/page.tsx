import { TagList, splitTags } from "@/components/tags-list";
import { Badge } from "@/components/ui/badge";
import { getRoom } from "@/data-access/room";
import { Link, Github } from "lucide-react";

export default async function RoomPage(props : {params:{roomId:string}}){
const roomId=props.params.roomId;


const room=await getRoom(roomId)

if(!room){
    return <div>
        <h1>No room of this Id found</h1>
    </div>
}
    return   <div className="grid grid-cols-4 min-h-full">
<div className="col-span-3 p-4 pr-2 ">
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
        Video Player
    </div>
    </div>
    
<div className="col-span-1 p-4 pl-2">
    <div
    className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4"
    >
        <h1 className="font-bold capitalize text-xl">{room?.name}</h1>
        <p className="text-base text-gray-400">{room?.description}</p>
     
        <h1>Tags:</h1>
       <TagList tags={splitTags(room.tags)!} />
       <div className="flex text-center text-sm gap-2">
        {room?.githubRepo && (
          <Link
        
          target="blank"
          href={room.githubRepo || ""}>
              <Github />
          </Link>

) 
    }Github 
        </div>
    </div>
</div>
        </div>
        
}