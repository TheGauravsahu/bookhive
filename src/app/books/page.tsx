import { trpc } from "@/trpc/server";
import React from "react";

export default async function Books() {
  const books = await trpc.book.getAll();
  return (
    <div className="h-screen p-8">
      {books.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </div>
  );
}
