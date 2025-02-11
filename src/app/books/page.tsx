import BookCard from "@/components/books/book-card";
import { trpc } from "@/trpc/server";
import React from "react";

export default async function Books() {
  const books = await trpc.book.getAll();
  return (
    <div className="px-8 relative h-full w-full">
      <h1 className="text-3xl font-extrabold lg:my-4 mb-8">Latest Books</h1>
      <div className="flex flex-col md:flex-row items-center md:justify-normal justify-center gap-8 md:gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
