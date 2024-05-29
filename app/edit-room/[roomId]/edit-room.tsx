'use client'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { editRoomAction } from "./action"
import { useParams, useRouter } from "next/navigation"
import { Room } from "@/db/schema"
import { toast } from "@/components/ui/use-toast"
 
const formSchema = z.object({
   name: z.string().min(2).max(50),
   description: z.string().min(2).max(300),
   githubRepo: z.string().min(2).max(50),
   tags: z.string().min(2).max(300)
})

export function EditRoomForm({room}:{room :Room}){
 const router =useRouter()
const params=useParams();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: room.name,
          description:room.description ?? "",
          githubRepo:room.githubRepo ?? "",
          tags:room.tags,
        },
      })
  
     async function onSubmit(values: z.infer<typeof formSchema>) {

      toast({
        title:"Room Updated",
description:"Your room has been updated!"
      })
   await editRoomAction({
  id:params.roomId as string,
...values  
  })
      }

      return ( 
        <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public room name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>

                
              )}
            />
               <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                  Room description
                  </FormDescription>
                  <FormMessage />
                </FormItem>


                
              )}
            />

<FormField
              control={form.control}
              name="githubRepo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github Repository</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                  Github Repositry link or name
                  </FormDescription>
                  <FormMessage />
                </FormItem>


                
              )}
            />
            
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                  List of your programming languages,framework, libraries and anything related to your project so people can find your content</FormDescription>
                  <FormMessage />
                </FormItem>


                
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        </div>
      )

}