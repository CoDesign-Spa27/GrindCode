import dynamic from "next/dynamic";

const Signin = dynamic(() => import("@/components/auth/signin"), {
  ssr: false,
});
function page(){
    
    return(
        <div className="flex items-center justify-center w-full h-screen px-3">
            <Signin />
        </div>
    )
}

export default page;