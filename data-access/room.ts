
import  { db } from '@/db';
import { Room, room } from '@/db/schema';
import { eq, like, sql } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
 

export async function getRooms(search:string | undefined){

 
  if (!search) {
    // If no search term, return all rooms
    return await db.query.room.findMany();
}

// Use a raw SQL query to search for the search term in the tags array
const rooms = await db.execute(
    sql`SELECT * FROM room WHERE EXISTS (
      SELECT 1 FROM unnest(tags) AS tag WHERE tag ILIKE ${'%' + search + '%'}
    )`
);

return rooms;
}

export async function getUserRooms(){

    const session = await getSession();
  
    if(!session){
        throw new Error("user not Authenticated")
    }
    const rooms =await db.query.room.findMany({
        where:eq(room.userId,session.user.id)
    });
    return rooms;
}



export async function getRoom(roomId: string){
   
try {
   
  return await db.query.room.findFirst({
    where:eq(room.id,roomId)
        });

 }catch (err) {
  console.log(err)
}

}

export async function deleteRoom(roomId: string){
    await db.delete(room).where(eq(room.id,roomId));
}

export async function createRoom(
    roomData: Omit<Room, "id" | "userId">,
    userId: string
  ) {
    const inserted = await db
      .insert(room)
      .values({ ...roomData, userId })
      .returning();
    return inserted[0];
  }
  


export async function editRoom(roomData: Room) {
    const updated = await db
      .update(room)
      .set(roomData)
      .where(eq(room.id, roomData.id))
      .returning();
    return updated[0];
  }
 
