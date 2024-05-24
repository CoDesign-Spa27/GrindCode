
'use client'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react"
import { useEffect } from "react"

const formSchema = z.object({
    search: z.string().min(0).max(50),
   
 })
export function BrowseSearchBar(){
 
 const router =useRouter()
const query=useSearchParams();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
         search:  query.get("search") ?? ""
        
        },
      })
  
      const search =query.get("search");

      useEffect(()=>{
        form.setValue('search',search ?? "");
      },[search,form])

     async function onSubmit(values: z.infer<typeof formSchema>) {
if(values.search){  
   router.push(`/browse?search=${values.search}`)
}
      else {
        router.push("/")
      }
    }
      return ( 
    
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="gap-2  space-y-8 flex-wrap flex ">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Search</FormLabel>
                  <FormControl>
                    <Input 
                    className="sm:w-[500px] w-[130%] "
                    {...field} placeholder="Filter room by giving keywords like typescript, php, python, java" />
                  </FormControl>
               
                  <FormMessage />
                </FormItem>

                
              )}
            />
  
            <Button
            type="submit"><SearchIcon className="mr-2 text-sm"/> Search</Button>

            {
                query.get("search") && (
                    <Button 
                    variant="link"
                    onClick={()=>{
                        form.setValue("search","");
                        router.push("/");
                    }}
                    >clear</Button>
                )
            }
          </form>
        </Form>
       
      )

 
}