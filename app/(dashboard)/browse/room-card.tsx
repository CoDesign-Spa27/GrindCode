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
import { CircleArrowOutUpRight, GithubIcon, Lock } from "lucide-react";
import { TagList } from "@/components/tags-list";
import { useEffect, useState } from "react";
 

export function RoomCard({ room }: { room: Room }) {
  const [isPrivate, setIsPrivate] = useState<boolean | null>(false);

  useEffect(() => {
    setIsPrivate(room.isPrivate);
  }, [room.isPrivate]);

  
  function isValidUrl(url:string) {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }

 
  return (
    <div>
      {isPrivate ? (
        <Card className="bg-neutral-200 dark:bg-[#2f3547]">
          <CardHeader className="bg-neutral-500 dark:bg-neutral-900 rounded-t-md mb-2">
            <CardTitle className="flex text-white gap-4">{room.name} <Lock /></CardTitle>
           

            <CardDescription className="text-neutral-300">{room.description}</CardDescription>

          </CardHeader>
          <CardContent className="flex flex-col mt-5 gap-4">
            <div>

            <TagList tags={room.tags} />
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
              <p className="text-neutral-300 text-sm">No Github Repo Available</p>
            </div>)}
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href={`/rooms/${room.id}`}>Join Private Room</Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="bg-neutral-200 dark:bg-[#2f3547]">
          <CardHeader className="bg-neutral-500 text-white dark:bg-neutral-900 rounded-t-md mb-2">
            <CardTitle>{room.name}</CardTitle>
            <CardDescription className="text-neutral-300">{room.description}</CardDescription>
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
