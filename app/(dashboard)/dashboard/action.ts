"use server";
import { getUserRooms } from "@/data-access/room";
import { countUserRooms, getUser } from "@/data-access/user";
import { getSession } from "../../../lib/auth";

export async function UserRooms() {
  try {
    const userRooms = await countUserRooms();

    return userRooms;
  } catch (error) {
    console.error("Error in UserRooms function:", error);
    throw new Error("Failed to fetch user rooms.");
  }
}

// export async function upgradingToPro() {
//   const session = await getSession();

//   await upgradeToPro(session?.user.id || "");
// }

export async function getUserDetails(){
  try{
    const result=  await getUser();
    return result;
  }
  catch(error){
    console.log("error getting user details"+error)
    throw new Error("Error Getting User Details")

  }

}
