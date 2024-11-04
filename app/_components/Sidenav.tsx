"use client"
import React, { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";
import {
  FiChevronDown,
  FiChevronsRight,
  FiHome,
} from "react-icons/fi";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { MdAddToQueue } from "react-icons/md";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { GrLogout } from "react-icons/gr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCircle } from "lucide-react";

export const Sidenav = () => {

  return (
    <div className="flex h-screen w-full ">
      <Sidebar />
   
      <ExampleContent />

    </div>
  );
};

const Sidebar = () => {
  const pathname =usePathname();
 
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(pathname);

  return (
    <motion.nav
      layout
      className="sticky top-0  h-screen shrink-0 border-r p-5"
      style={{
        width: open ? "250px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/dashboard"

        />
        <Option
          Icon={SiGoogleclassroom}
          title="Your Rooms"
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={3}
          href="/your-rooms"

        />
        <Option
          Icon={MdOutlineScreenSearchDesktop}
          title="Browse Rooms"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/browse"

        />
        <Option
          Icon={MdAddToQueue}
          title="Create Room"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/create-room"

        />
      
 
  <Option
          Icon={GrLogout}
          title="Log out"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/api/auth/signout"
        />
  
       
      </div>
<div>
 
</div>
      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  href,
  notifs,
}: {
  Icon: IconType;
  title: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  open: boolean;
  href?: string;
  notifs?: number;
}) => {
  return (
    <Link href={href || ""} passHref >
    <motion.button
      layout
      onClick={() => setSelected(href || "")}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${selected === href ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-gray-800 hover:text-gray-200 font-black"}`}
      >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg font-bold
        "
        >
        <Icon />
      </motion.div>
      {open && (
          <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-sm font-bold"
          >
          {title}
        </motion.span>
      )}

    
    </motion.button>
</Link>
  );
};

const TitleSection = ({ open }: { open: boolean }) => {
    const { data: session, status } = useSession();
    const isLoggedIn = status === "authenticated";
  return (
    <div className="mb-3 border-b  pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors dark:hover:bg-gray-800">
        <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <Avatar>
            <AvatarImage
              className="md:w-12 md:h-12 w-10 h-10 rounded-full"
              src={session.user.image || ""}
              alt="Profile"
            />
            <AvatarFallback><UserCircle /></AvatarFallback>
          </Avatar>
        ) : (
          <div>
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              ></circle>
              <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
      
            </div>
        )}
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">{session?.user.name}</span>
              <span className="block text-xs text-slate-500">{session?.user.email}</span>
            </motion.div>
          )}
        </div>
     
      </div>
    </div>
  );
};

const ToggleClose = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t transition-colors dark:hover:bg-gray-800"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
     
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

const ExampleContent = () => <div className="h-[200vh] w-full"></div>;