
import { db } from "@/db";

export default async function Home() {


  const item=await db.query.room.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       {item.map((room)=>{
   return <div key={room.id}>
{room.id}
{room.name}
   </div>
       })}
    </main>
  );
}
