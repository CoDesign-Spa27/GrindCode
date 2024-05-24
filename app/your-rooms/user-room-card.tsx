"use client"
import { Room } from "@/db/schema";
import { splitTags } from "@/lib/utils";
import { Github, Trash } from "lucide-react";
import { TagList } from "../../components/tags-list";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card";
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
} from "@/components/ui/alert-dialog"
import { deleteRoomAction } from "./action";


export function UserRoomCard({ room }: { room: Room }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{room.name}</CardTitle>
          <CardDescription>
            {room.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="pb-3">Tags :</h1>
        <TagList tags={splitTags(room.tags)!} />
          
        </CardContent>
        <CardContent>
       <div className="flex text-sm gap-2">
          {room?.githubRepo && (
            <Link
          
            target="blank"
            href={room.githubRepo || ""}>
                <Github />
            </Link>
  
  ) 
      }Github 
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
         

          <Button asChild><Link
          href={`/rooms/${room.id}`}
          >Join Room</Link></Button>



     
      <AlertDialog>
  <AlertDialogTrigger asChild>
  <Button 

variant='destructive'
>
      <Trash className="w-4 h-4 mr-2" />    Delete Room</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your room
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
  
      <AlertDialogAction
      onClick={()=>{
    deleteRoomAction(room.id)
      }}
      >Yes, deleted</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


        </CardFooter>
      </Card>
    );
  }