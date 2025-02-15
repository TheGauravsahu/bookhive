import { auth } from "@/auth";
import BooksList from "@/components/books/books";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/server";
import Link from "next/link";
import React from "react";

export default async function Books() {
  const session = await auth();
  void trpc.book.getAll.prefetch();

  return (
    <div className="px-8 relative h-full w-full">
      <Button className="my-4">
        <Link href="/books/add">Add a book</Link>
      </Button>
      <h1 className="text-3xl font-extrabold lg:my-4 mb-8">Latest Books</h1>
      <BooksList userId={session?.user.id as string} />
    </div>
  );
}
