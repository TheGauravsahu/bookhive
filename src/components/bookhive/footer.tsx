import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t p-4 flex gap-4 flex-col md:flex-row  items-center justify-between px-16">
      <div>
        <h1 className="text-7xl font-semibold">Bookhive</h1>
        <p className="mt-1 text-sm text-gray-400">© All copyright right reserved Beehive</p>
      </div>
      <div className="flex gap-4 ">
        <Link href="/">Home</Link>
        <Link href="/books">Books</Link>
        <Link href="/">Trending</Link>
      </div>
    </footer>
  );
}
