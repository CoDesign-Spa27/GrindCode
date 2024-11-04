'use client';
import { useState } from "react";
import { TagList } from "@/components/tags-list";
import { Link, Github } from "lucide-react";
import { GrindCodeVideo } from "@/app/rooms/[roomId]/video-player";
import ChatComponent from "@/components/chat/ChatComponent";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Alert } from "./ui/alert";
import { toast } from "./ui/use-toast";
export default function EnterPin({ room }: { room: any }) {
  const [pin, setPin] = useState("");
  const [isVerified, setIsVerified] = useState(false);
 
  const router = useRouter();

  const handleCancel = () => {
    router.push('/browse')
  }
  
  const handlePinSubmit = (e: React.FormEvent) => {
     
    e.preventDefault();
    if (pin === room.pin) {
      setIsVerified(true);
    } else {
    toast({
      variant:'destructive',
      title:"Wrong Pin",
      description:"Please enter correct securiy pin to access room."
    })
      
    }
  };

  if (room.isPrivate && !isVerified) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center p-20 rounded-xl border-2">
        <h1 className="sm:text-3xl text-xl text-center font-bold">This is Room is Private </h1>
        <h5 className="py-5 text-sm font-thin">Please Enter 4 digit PIN to access the room.</h5>
        <form onSubmit={handlePinSubmit} className="flex flex-col items-center">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm     disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 "
            placeholder="Enter PIN"
          />
          <div className="flex justify-center items-center gap-5">
          <Button onClick={handleCancel} variant="destructive" >Cancel</Button>
          <Button type="submit" className="btn my-5 btn-primary">Submit</Button>
          </div>
         
        </form>
        </div>
     
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
