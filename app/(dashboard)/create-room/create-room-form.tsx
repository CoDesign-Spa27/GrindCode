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
import { createRoomAction } from "./actions"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
import { InputTags } from "@/components/InputTags"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import bcrypt from 'bcryptjs';
const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(300),
  githubRepo: z.string().min(2).max(50),
  tags: z.array(z.string().min(2).max(50)),
  isPrivate: z.boolean().default(false),
  pin: z.string().optional()
}).superRefine((data, ctx) => {
  if (data.isPrivate && (!data.pin || !/^\d{4}$/.test(data.pin))) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "PIN is required and must be 4 digits for private rooms",
      path: ["pin"]
    });
  }
  if (!data.isPrivate && data.pin) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "PIN should not be set for public rooms",
      path: ["pin"]
    });
  }
});

export function CreateRoomForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      githubRepo: "",
      tags: [] as string[],
      isPrivate: false,
      pin: ""
    },
  });

  


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const hashedPin = values.pin ? bcrypt.hashSync(values.pin, 10) : ""

    try {
      const room = await createRoomAction({
        ...values,
        pin: values.isPrivate? hashedPin :""
      });

      toast({
        title: "Room Created",
        description: "Your Room is Created"
      });

      router.push(`/rooms/${room?.id}`);
    } catch (error) {
      toast({
        title: "Error Creating Room",
        description: "There was an error while creating the room"
      });
    } finally {
      setLoading(false);
    }
  }

  const handlePrivateChange=(value:string)=>{
const isPrivateRoom=value === "private";
setIsPrivate(isPrivateRoom);
form.setValue("isPrivate",isPrivateRoom);
if(!isPrivateRoom){
  form.setValue("pin",'');
}
if (!isPrivateRoom) {
  form.clearErrors("pin");
}  }

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-4 gap-3 min-h-full">
          <div className="flex flex-col gap-5 col-span-3">
            <div role="status" className="flex items-center justify-center h-96 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
              </svg>
            </div>
            <div className="h-10 bg-gray-300 animate-pulse w-full rounded-lg dark:bg-gray-700"></div>
          </div>
          <div className="h-56 bg-gray-300 col-span-1 rounded-lg animate-pulse dark:bg-gray-700"></div>
        </div>
      ) : (
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field}
                      placeholder="Name of your project."/>
                     
                    </FormControl>
                  
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} 
                      placeholder="A short description of your project."/>
                      
                    </FormControl>
                    
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
                      <Input {...field}
                      placeholder="Link to your project's Github repository."/>
                    
                    </FormControl>
                 
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
                      <InputTags {...field} 
                    placeholder="  List of your programming languages, framework, libraries, and anything related to your project so people can find your content."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPrivate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Privacy</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value ? "private" : "public"}
                        onValueChange={handlePrivateChange}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="public" id="public" />
                          <Label htmlFor="public">Public</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="private" id="private" />
                          <Label htmlFor="private">Private</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>Select who can enter your room.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isPrivate && (
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PIN</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Enter a 4-digit PIN for private room access.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button
              className="bg-pink-500 text-white font-bold hover:bg-pink-600"
              type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}