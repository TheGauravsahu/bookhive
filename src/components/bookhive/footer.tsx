import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t p-4 flex gap-4 flex-col md:flex-row  items-center justify-between px-16">
      <div>
        <h1 className="text-7xl font-semibold">Bookhive</h1>
      </div>
      <div className="flex gap-4 flex-row md:flex-col md:justify-center">
        <Link href="/">Home</Link>
        <Link href="/">Books</Link>
        <Link href="/">Trending</Link>
      </div>
    </footer>
  );
}
