import Link from "next/link";
import { Toggle } from "./toggle";
import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User2 } from "lucide-react";
import Logout from "../auth/logout";
import { SidebarTrigger } from "../ui/sidebar";

export default async function Header() {
  const session = await auth();

  return (
    <header className="flex justify-between items-center px-6 py-3 md:px-12 border-b fixed top-0 left-0 right-0 bg-background z-50">
      <Link href="/">
        <h1 className="text-2xl md:text-3xl font-bold">BookHive 📚</h1>
      </Link>

      {/* links/sidebar */}
      <div className="hidden md:flex items-center justify-center gap-4 *:font-semibold ">
        <Link href="/">Home</Link>
        <Link prefetch={true} href="/books">
          Books
        </Link>
        <Link prefetch={true} href="/books">
          Trending
        </Link>
      </div>

      <div className="flex gap-2 items-center">
        <Toggle />
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <User2 className="p-2 size-8" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="*:cursor-pointer">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>
                <Logout />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button className="relative inline-flex  overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              <Link href="/login">Login</Link>
            </span>
          </button>
        )}
        <SidebarTrigger />
      </div>
    </header>
  );
}
