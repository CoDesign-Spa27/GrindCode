"use client";

import Image from "next/image";
import { Tabs } from "../ui/tabs";

export function Tutorial() {
  const tabs = [
    {
      title: "Create Room",
      value: "create room",
      content: (
        <div className="w-full overflow-hidden relative h-full  rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-b from-transparent to-indigo-500 shadow-[0_8px_15px_-3px_rgba(102,126,234,0.6)]">
          <CreateRoom />
        </div>
      ),
    },
    {
      title: "YourRoomInside",
      value: "YourRoomInside",
      content: (
        <div className="w-full overflow-hidden shadow-[0_8px_15px_-3px_rgba(102,126,234,0.6)] relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-b from-transparent to-indigo-500">
  
          <YourRoomInside />
        </div>
      ),
    },
    {
      title: "Dashboard",
      value: "Dashboard",
      content: (
        <div className="w-full overflow-hidden shadow-[0_8px_15px_-3px_rgba(102,126,234,0.6)] relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-b from-transparent to-indigo-500">
  
          <Dashboard />
        </div>
      ),
    },
    {
      title: "YourRooms",
      value: "YourRooms",
      content: (
        <div className="w-full overflow-hidden shadow-[0_8px_15px_-3px_rgba(102,126,234,0.6)] relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-b from-transparent to-indigo-500">
 
          <YourRooms />
        </div>
      ),
    },
    {
      title: "JoinRoom",
      value: "JoinRoom",
      content: (
        <div className="w-full overflow-hidden shadow-[0_8px_20px_-3px_rgba(102,126,234,0.6)] relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white  bg-gradient-to-b from-transparent to-indigo-500 ">
         <JoinRoom />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mt-10 mb-40">
    
      <Tabs tabs={tabs} />
    </div>
  );
}

const CreateRoom = () => {
  return (
 
    <Image
     src="https://i.ibb.co/0Vpc6kZ/createroom.png"
      alt="create room image"
      width="1000"
      height="1000"
      unoptimized
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};


const YourRoomInside = () => {
  return (
 
    <Image
     src="https://i.ibb.co/xsfycjd/room.png"
      alt="your room image"
      width="1000"
      unoptimized
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};



const Dashboard = () => {
  return (
 
    <Image
     src="https://i.ibb.co/5rtJr5Z/yourdashboard.png"
      alt="Dashboard image"
      width="1000"
      unoptimized
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};


const YourRooms = () => {
  return (
 
    <Image
     src="https://i.ibb.co/jMk9G9v/joinyourroom.png"
      alt="your rooms image"
      width="1000"
      height="1000"
      unoptimized
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};




const JoinRoom = () => {
  return (
 
    <Image
     src="https://i.ibb.co/kyj0qQC/joinotherrooms.png"
      alt="Join room image"
      width="1000"
      height="1000"
      unoptimized
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
