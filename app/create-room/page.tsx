import { CreateRoomForm } from "./create-room-form";

export default function CreateRoomPage(){
    return <div className="container mx-auto flex flex-col gap-2 pt-12 pb-12">
        <h1 className="text-3xl font-bold py-1">
            Create Room
        </h1>
        <CreateRoomForm />
    </div>
}