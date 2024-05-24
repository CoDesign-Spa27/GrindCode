 
import Link from "next/link";

export default async function Home({searchParams}: {
  searchParams: {
    search:string;
  }
}) {
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="flex justify-center bg-gradient-to-r from-rose-200 to-teal-200 dark:bg-gradient-to-r dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 gap-y-20 items-center flex-col w-full min-h-screen">
        <div className="flex flex-col items-center justify-between">
          <div className="md:text-7xl text-center text-4xl font-extrabold">
          Grinding Code{" "}
          <span className="text-xl">with</span>
            <span className="md:text-5xl font-extrabold dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-l dark:from-gray-500 dark:via-green-300 dark:to-zinc-500 inset-x-0 bottom-0 h-px bg-gradient-to-r from-sky-500/0 via-purple-400/70 to-sky-500/0">
              {" "}
              Realms!
            </span>
          </div>
          <div className="py-8 text-center px-5 md:text-lg">
            Code Together, Innovate Forever: Join Tech-Savvy Rooms for Every
            Stack!
          </div>
        </div>
        <div>
          <Link href="/create-room">
            <button className="hidden dark:block" id="create-room-button-dark">
              Get Started
            </button>
          </Link>
          <Link href="/create-room">
            <button className="block dark:hidden" id="create-room-button-light">
              Get Started
            </button>
          </Link>
        </div>
      </div>
        
    </main>
  );
}

