import { formatDate } from "@/lib/utils";
import { Book } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BookCardProps {
  book: Book;
}
export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="w-96 h-96 border rounded-lg p-4 dark:bg-black bg-secondary">
      <div className="w-full h-[60%] rounded-lg overflow-hidden">
        <Link href={"/books/" + book.id} prefetch={true}>
          <Image
            className="w-full h-full rounded-lg object-cover cursor-pointer hover:scale-95 ease-in-out transition-all"
            width={600}
            height={600}
            src={book.coverImage}
            alt={book.title}
          />
        </Link>
      </div>
      <div className="mt-4 *:cursor-pointer">
        <h2 className="font-bold text-lg">{book.title}</h2>
        <h3 className="font-semibold text-foreground/80">
          Author - {book.author}
        </h3>
        <p className="text-foreground/60">
          {book.description.slice(1, 80)}...
          <Link
            href={"/books/" + book.id}
            className="ml-1 text-blue-400 hover:underline"
          >
            more
          </Link>
        </p>
        <span className="mt-4 text-xs text-foreground/30">
          {formatDate(book.createdAt)}
        </span>
      </div>
    </div>
  );
}
