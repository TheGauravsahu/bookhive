import { formatDate } from "@/lib/utils";
import { Book } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BookActions from "./book-actions";

interface BookCardProps {
  book: Omit<Book, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
  };
  userId: string | null;
}

export default function BookCard({ book, userId }: BookCardProps) {
  const isCurrentUserBook = book.userId === userId;

  return (
    <div className="w-80 h-96 border rounded-lg p-4">
      <div className="w-full h-[60%] rounded-lg overflow-hidden dark:bg-black bg-secondary">
        <Link href={"/books/" + book.id} prefetch={true}>
          <Image
            className="h-full rounded-lg object-contain cursor-pointer hover:scale-95 ease-in-out transition-all"
            width={600}
            height={600}
            src={book.coverImage}
            alt={book.title}
          />
        </Link>
      </div>
      <Link href={"/books/" + book.id}>
        <div className="mt-4 *:cursor-pointer">
          <h2 className="font-bold">{book.title}</h2>
          <h3 className="font-semibold text-sm text-foreground/80 my-1">
            Author - {book.author}
          </h3>
          <p className="text-foreground/60 text-sm">
            {isCurrentUserBook
              ? book.description.slice(1, 40)
              : book.description.slice(1, 60)}
            ...
          </p>
          <span className="mt-4 text-xs text-foreground/40">
            {formatDate(book.createdAt)}
          </span>
        </div>
      </Link>

      {/* actions */}
      {isCurrentUserBook && <BookActions bookId={book.id} />}
    </div>
  );
}
