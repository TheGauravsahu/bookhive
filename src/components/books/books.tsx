"use client";
import { trpc } from "@/trpc/client";
import React from "react";
import BookCard from "./card/book-card";

export default function BooksList() {
  const [books] = trpc.book.getAll.useSuspenseQuery();

  return (
    <div className="flex flex-col md:flex-row items-center md:justify-normal justify-center gap-8 md:gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
