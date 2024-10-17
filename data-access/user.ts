"use server";
import { db } from "../db"; 
import { eq, sql } from "drizzle-orm";
import { room, users } from "@/db/schema";
import { getSession } from "../lib/auth";

export async function countUserRooms() {
  const session = await getSession();

  if (!session?.user.id) {
    throw new Error("User is not authenticated");
  }

  const result = await db
    .select({
      totalRooms: sql<number>`COUNT(*)`.as("count"),
      privateRooms: sql<number>`COUNT(*) FILTER (WHERE "isPrivate" = true)`.as(
        "privateCount"
      ),
      publicRooms: sql<number>`COUNT(*) FILTER (WHERE "isPrivate" = false)`.as(
        "publicCount"
      ),
    })
    .from(room)
    .where(eq(room.userId, session.user.id));

  return result[0];
}

// export async function upgradeToPro(userId: string) {
//   await db.update(users).set({ isPro: true }).where(eq(users.id, userId));

//   return { success: true, message: "User upgraded to Pro" };
// }

export async function getUser() {
  const session = await getSession();

  if (!session?.user.id) {
    throw new Error("User is not authenticated");
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, session?.user.id));
 
  return result[0];
}
