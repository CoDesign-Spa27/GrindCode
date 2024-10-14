import { db } from "@/db";
import { Room, room, users } from "@/db/schema";
import { eq, like, sql } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { countUserRooms } from "./user";

export async function getRooms(search: string | undefined) {
  if (!search) {
    return await db.query.room.findMany();
  }

  const rooms = await db.execute(
    sql`SELECT * FROM room WHERE EXISTS (
      SELECT 1 FROM unnest(tags) AS tag WHERE tag ILIKE ${"%" + search + "%"}
    )`
  );

  return rooms;
}

export async function getUserRooms() {
  const session = await getSession();

  if (!session) {
    throw new Error("user not Authenticated");
  }
  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session.user.id),
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  try {
    return await db.query.room.findFirst({
      where: eq(room.id, roomId),
    });
  } catch (err) {
    console.log(err);
  }
}

export async function deleteRoom(roomId: string) {
  await db.delete(room).where(eq(room.id, roomId));
}

export async function createRoom(
  roomData: Omit<Room, "id" | "userId">,
  userId: string
) {
  const user = await db
    .select({
      id: users.id,
      isPro: users.isPro,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user.length) {
    throw new Error("User not found");
  }
  const isPro = user[0].isPro;
  const roomCount = await countUserRooms();

  if (!isPro) {
    if (roomCount.totalRooms >= 2) {
      throw new Error("Non-pro users can only create up to 2 rooms.");
    }
    if (roomData.isPrivate) {
      throw new Error("Non-pro users cannot create private rooms.");
    }
  }
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
