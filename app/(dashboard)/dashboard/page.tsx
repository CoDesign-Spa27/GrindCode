"use client";
import { countUserRooms } from "@/data-access/user";
import Image from "next/image";
import { getUserDetails } from "./action";
import { useEffect, useState } from "react";
import { User } from "@/db/schema";
import dynamic from "next/dynamic";

const Loader = dynamic(() => import("@/components/Loader"));


export interface userRoomCountType {
  totalRooms: number;
  privateRooms: number;
  publicRooms: number;
}

export default function Dashboard() {
  const [userRoomCount, setUserRoomCount] = useState<userRoomCountType>();
  const [userDetails, setUserDetails] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchUserRooms(), fetchUserDetails()]);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  async function fetchUserRooms() {
    try {
      const userRoom = await countUserRooms();
      setUserRoomCount(userRoom);
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchUserDetails() {
    try {
      const userDetails = await getUserDetails();
      setUserDetails(userDetails);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (isLoading || !userDetails || !userRoomCount) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLoading, userDetails, userRoomCount]);

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <div className="p-5">
            <div className="dark:bg-gray-900 bg-gray-200 p-5 rounded-lg mb-8">
              <div className="flex justify-between items-center gap-4">
                <div>
                  <div className="text-lg flex gap-2 items-center font-bold">
                    Hello{" "}
                    <img
                      src="/celebration.svg"
                      alt="celebration"
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                    {userDetails && userDetails?.name}
                  </div>
                </div>
                <div className="w-36 pt-5 h-36">
                  <Image src={"/pro.svg"} alt="Pro" width={120} height={120} />
                </div>
              </div>

              {/* <div className="flex justify-between items-center gap-4">
            <div>
            <div
            
            className="flex gap-2 items-center text-sm"
            >
            Become a pro with one click{" "}
            <ArrowUpRightFromCircleIcon className="w-4 h-4" />
            </div>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            You are not a Pro
            </div>
            </div>
            <div className="w-36 pt-5 h-36">
            <Image src={"/noPro.svg"} alt="No Pro" width={100} height={100} />
            </div>
            </div> */}
            </div>

            <div className="dark:bg-gray-900 bg-gray-200 p-5 rounded-lg">
              <div className="text-xl uppercase font-medium mb-4">
                Your Stats
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="dark:bg-gray-800 bg-gray-300 p-5 rounded-lg">
                  <div className="text-sm font-bold">Total Rooms Created</div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                    {userRoomCount?.totalRooms}
                  </div>
                </div>
                <div className="dark:bg-gray-800 bg-gray-300 p-5 rounded-lg">
                  <div className="text-sm font-bold">No of Public Rooms</div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                    {userRoomCount?.publicRooms}
                  </div>
                </div>
                <div className="dark:bg-gray-800 bg-gray-300 p-5 rounded-lg">
                  <div className="text-sm font-bold">No of Private Rooms</div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                    {userRoomCount?.privateRooms}
                  </div>
                </div>
                <div className="dark:bg-gray-800 bg-gray-300 p-5 rounded-lg">
                  <div className="text-sm font-bold">Interests</div>
                  <div className="flex py-2 flex-wrap gap-2">
                    {/* {user.interest.tags.map((tag, idx) => (
                <div
                key={idx}
                className="bg-gray-200 font-bold text-black text-sm px-2 py-1 rounded-full text-center"
                >
                {tag}
                </div>
                ))} */}
                    <div className="text-md font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-500 to-red-400">
                      Comming Soon....
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
