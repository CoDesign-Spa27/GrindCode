"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { CircleArrowOutUpRight, GithubIcon, LinkIcon, Lock } from "lucide-react";
import { TagList } from "@/components/tags-list";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
 

export function RoomCard({ room }: { room: Room }) {
  const [isPrivate, setIsPrivate] = useState<boolean | null>(false);
  const [roomId,setRoomId]=useState<string | null>(null);
  const { toast } = useToast();
 
const  BASE_URL_LOCAL='http://localhost:3000/rooms/';
// const  BASE_URL_PROD='"http://localhost:3000';
useEffect(() => {
  setIsPrivate(room.isPrivate);
  setRoomId(room.id);
}, [room.isPrivate]);

const roomLink=BASE_URL_LOCAL + roomId;
console.log(roomLink);
  
  function isValidUrl(url:string) {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }

 
  const copyRoomLink=()=>{
    navigator.clipboard.writeText(roomLink);
    toast({
      title: "Room Link Copied!",
      duration: 5000,
    });
  }
  return (
    <div>
      {isPrivate ? (
        <Card className="">
          <CardHeader className="relative rounded-t-md mb-2">
          <div className="absolute top-4 right-5 cursor-pointer">

<LinkIcon onClick={copyRoomLink} />
           </div>
            <CardTitle className="flex text-neutral-900 dark:text-white gap-4">{room.name} <Lock /></CardTitle>
           

            <CardDescription className="text-neutral-400">{room.description}</CardDescription>
         
            <TagList tags={room.tags} />
          </CardHeader>
          <CardContent className="flex flex-col mt-5 gap-4">
            <div>

            </div>
            {isValidUrl(room.githubRepo || "") ? (
              <Link
              href={room.githubRepo || ""}
              className="flex items-center text-sm gap-2"
              target="_blank"
              rel="noopener noreferrer"
              >
                <GithubIcon />
                Github Project
              <CircleArrowOutUpRight className="w-4 h-4" />
              </Link>
            ):(<div>
              <p className="text-neutral-400 text-sm">No Github Repo Available</p>
            </div>)}
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href={`/rooms/${room.id}`}>Join Private Room</Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className=" ">
          <CardHeader className=" text-neutral-900  dark:text-white rounded-t-md mb-2">
            <CardTitle>{room.name}</CardTitle>
            <CardDescription className="text-neutral-400">{room.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex mt-5 flex-col gap-4">
           <TagList tags={room.tags} />
            {room.githubRepo && (
              <Link
                href={room.githubRepo}
                className="flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
                Github Project
              <CircleArrowOutUpRight className="w-4 h-4" />
              </Link>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href={`/rooms/${room.id}`}>Join Room</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export type { Room };
