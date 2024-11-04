"use client"
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";


export function  TagList({tags}:{tags:string[]}){
  const router=useRouter();
return   <div>
{tags.map((tag) =>
 ( <Badge
 onClick={()=>{
    router.push(`/browse?search=${tag}`);
 }

 }
key={tag}
 className="mx-1 cursor-pointer my-1 w-fit"
 
 >{tag}</Badge>))}


</div>
}