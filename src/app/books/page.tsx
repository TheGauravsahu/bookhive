import BookCard from "@/components/books/book-card";
import { trpc } from "@/trpc/server";
import React from "react";

export default async function Books() {
  const books = await trpc.book.getAll();
  return (
    <div className="p-8 md:px-8">
      <h1 className="text-3xl font-extrabold ld:my-4 mb-8">Latest Books</h1>
      <div className="flex items-center md:justify-normal justify-center gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
