"use client"
import { MdAddBox } from "react-icons/md";
import { CreateRoomForm } from "./create-room-form";

export default function CreateRoomPage(){
    return <div className="container mx-auto flex flex-col gap-2 pt-5 pb-12">
        <div className=" flex gap-3">
        <h1 className="text-3xl font-bold pb-3">
            Create Room
        </h1>
        <MdAddBox className="text-4xl text-pink-400" />
        </div>
       
        <CreateRoomForm />
    </div>
}