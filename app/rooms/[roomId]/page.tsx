 
import { getRoom } from "@/data-access/room";
 
import EnterPin from "@/components/EnterPin"; // Client-side component for PIN input

export default async function RoomPage({ params }: { params: { roomId: string } }) {
  const { roomId } = params;
  const room = await getRoom(roomId);

  if (!room) {
    return (
      <div>
        <h1>No room with this ID found</h1>
      </div>
    );
  }

  return (
    <div  >
      <EnterPin room={room} />
    </div>
  );
}
