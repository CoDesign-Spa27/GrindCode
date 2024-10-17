"use client";
import { Room } from "@/db/schema";
import { CircleArrowOutUpRight, Github, GithubIcon, Lock, PencilIcon, Trash } from "lucide-react";
import { TagList } from "../../../components/tags-list";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../components/ui/card";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteRoomAction } from "./action";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export function UserRoomCard({ room }: { room: Room }) {
  const [isPrivate, setIsPrivate] = useState<boolean | null>(false);

  useEffect(() => {
    setIsPrivate(room.isPrivate);
  }, [room.isPrivate]);

  const handleDeleteButton = () => {
    deleteRoomAction(room.id);

    toast({
      variant:"destructive",
      title: "Room Deleted",
      description: "Your Room has been  successfully deleted",
    });
  };

    
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
          <CardHeader className="bg-neutral-500 relative dark:bg-neutral-900 rounded-t-md mb-2">
            <Link href={`/edit-room/${room.id}`}>
              <Button size="icon" className="absolute top-4 right-3">
                <PencilIcon className="w-4 h-4" />
              </Button>
            </Link>

            <CardTitle className="flex text-white gap-4">
              {room.name} <Lock />
            </CardTitle>

            <CardDescription className="text-neutral-300">
              {room.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col mt-5 gap-4">
            <TagList tags={room.tags!} />
          </CardContent>
          <CardContent>
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
          <CardFooter className="flex gap-2">
            <Button asChild>
              <Link href={`/rooms/${room.id}`}>Join Room</Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash className="w-4 h-4 mr-2" /> Delete Room
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your room and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                  <AlertDialogAction
                    onClick={() => {
                      handleDeleteButton();
                    }}
                  >
                    Yes, deleted
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ) : (
        <Card className="bg-neutral-200 dark:bg-[#2f3547]">
          <CardHeader className="bg-neutral-500 relative text-white dark:bg-neutral-900 rounded-t-md mb-2">
            <Link href={`/edit-room/${room.id}`}>
              <Button size="icon" className="absolute top-4 right-3">
                <PencilIcon className="w-4 h-4" />
              </Button>
            </Link>

            <CardTitle>{room.name}</CardTitle>
            <CardDescription className="text-neutral-300">
              {room.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex mt-5 flex-col gap-4">
            <TagList tags={room.tags!} />
          </CardContent>
          <CardContent>
            <div className="flex text-sm gap-2">
              {room?.githubRepo && (
                <Link target="blank" href={room.githubRepo || ""}>
                  <Github />
                </Link>
              )}
              Github
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button asChild>
              <Link href={`/rooms/${room.id}`}>Join Room</Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash className="w-4 h-4 mr-2" /> Delete Room
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your room and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                  <AlertDialogAction
                    onClick={() => {
                      handleDeleteButton();
                    }}
                  >
                    Yes, deleted
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
