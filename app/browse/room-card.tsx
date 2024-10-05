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
import { GithubIcon, Lock } from "lucide-react";
import { TagList } from "@/components/tags-list";
import { useEffect, useState } from "react";

export function RoomCard({ room }: { room: Room }) {
  const [isPrivate, setIsPrivate] = useState<boolean | null>(false);

  useEffect(() => {
    setIsPrivate(room.isPrivate);
  }, [room.isPrivate]);

  return (
    <div>
      {isPrivate ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-4">{room.name} <Lock /></CardTitle>
           

            <CardDescription>{room.description}</CardDescription>

          </CardHeader>
          <CardContent className="flex flex-col gap-4">
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
              </Link>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href={`/rooms/${room.id}`}>Join Private Room</Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{room.name}</CardTitle>
            <CardDescription>{room.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
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

export { Room };
