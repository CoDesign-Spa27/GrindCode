import { Badge } from "./ui/badge";

export function splitTags(tags:string){
   return tags.split(",").map(tag => tag.trim());
}

export function  TagList({tags}:{tags:string[]}){
    console.log(tags);
return   <div>
{tags.map((tag) =>
 ( <Badge
key={tag}
 className=" w-fit"
 
 >{tags}</Badge>))}


</div>
}