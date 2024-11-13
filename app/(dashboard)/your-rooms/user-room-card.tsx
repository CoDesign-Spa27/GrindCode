"use client";
import { Room } from "@/db/schema";
import {
  CircleArrowOutUpRight,
  Github,
  GithubIcon,
  Lock,
  PencilIcon,
  LinkIcon,
  Trash,
  Trash2,
} from "lucide-react";
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
import { useRouter } from "next/navigation";

export function UserRoomCard({ room }: { room: Room }) {
  const [isPrivate, setIsPrivate] = useState<boolean | null>(false);
  const [roomId, setRoomId] = useState<string | null>(null);


  const BASE_URL_LOCAL = "http://localhost:3000/rooms/";
  // const  BASE_URL_PROD='"http://localhost:3000';

  useEffect(() => {
    setIsPrivate(room.isPrivate);
    setRoomId(room.id);
  }, [room.isPrivate]);

  const handleDeleteButton = () => {
    deleteRoomAction(room.id);

    toast({
      variant: "destructive",
      title: "Room Deleted",
      description: "Your Room has been  successfully deleted",
    });
  };
  const roomLink = BASE_URL_LOCAL + roomId;

  const copyRoomLink = () => {
    navigator.clipboard.writeText(roomLink);
    toast({
      title: "Room Link Copied!",
      duration: 5000,
    });
  };
  function isValidUrl(url: string) {
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
        <Card className="">
          <CardHeader className="  relative   rounded-t-md mb-2">
            <div className="flex items-center gap-5 absolute top-4 right-3">
              <Link href={`/edit-room/${room.id}`}>
                <div className="">
                  <PencilIcon size={22} />
                </div>
              </Link>

              <div className=" cursor-pointer">
                <LinkIcon onClick={copyRoomLink} />
              </div>
            </div>

            <CardTitle className="flex text-neutral-900 dark:text-white gap-4">
              {room.name} <Lock />
            </CardTitle>

            <CardDescription className="text-neutral-400">
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
            ) : (
              <div>
                <p className="text-neutral-400 text-sm">
                  No Github Repo Available
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button asChild>
              <Link href={`/rooms/${room.id}`}>Join Room</Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="rounded-full ml-3">
                  <Trash2 size={22} className=" text-red-600 cursor-pointer" />
                </div>
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
        <Card className="">
          <CardHeader className="  relative text-neutral-900  dark:text-white rounded-t-md mb-2">
            <div className="flex items-center gap-5 absolute top-4 right-3">
              <Link href={`/edit-room/${room.id}`}>
                <div className="">
                  <PencilIcon size={22} />
                </div>
              </Link>

              <div className=" cursor-pointer">
                <LinkIcon onClick={copyRoomLink} />
              </div>
            </div>

            <CardTitle>{room.name}</CardTitle>
            <CardDescription className="text-neutral-400">
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
                <div className="rounded-full ml-3 cursor-pointer">
                  <Trash2 size={22} className=" text-red-600" />
                </div>
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
