import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t p-4 flex gap-4 flex-col md:flex-row  items-center justify-between px-16">
      <div>
        <h1 className="text-7xl font-semibold">Bookhive</h1>
        <a
          target="_blank"
          href="https://gauravsahu.vercel.app/"
          className="mt-1 text-sm text-gray-400 cursor-pointer"
        >
          © All copyright right reserved Bookhive
        </a>
      </div>
      <div>
        <a target="_blank" className="hover:underline cursor-pointer" href="https://gauravsahu.vercel.app/">Designed and Developed with ❤️ by Gaurav Sahu </a>
      </div>
      <div className="flex gap-4 ">
        <Link href="/">Home</Link>
        <Link prefetch={true} href="/books">
          Books
        </Link>
        <Link href="/">Trending</Link>
      </div>
    </footer>
  );
}
