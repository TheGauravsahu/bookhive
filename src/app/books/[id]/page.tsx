import { trpc } from "@/trpc/server";
import Image from "next/image";
import React from "react";
import { Clock, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Review from "@/components/books/reviews/review";
import { auth } from "@/auth";

interface BookDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function BookDetails({ params }: BookDetailsProps) {
  const { id } = await params;
  const book = await trpc.book.getDetails({ id });

  void trpc.review.getAll.prefetch({ bookId: id });

  const session = await auth()

  if (!book) return <div>No book found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Book Header Section */}
      <div className="md:flex p-6 gap-8 border-b">
        <div className="flex-shrink-0">
          <Image
            src={book.coverImage}
            width={240}
            height={360}
            alt={book.title}
            className="rounded-lg shadow-md"
          />
        </div>

        <div className="flex-grow mt-4 md:mt-0">
          <h1 className="text-3xl font-bold  mb-2">{book.title}</h1>
          <p className="text-lg mb-4">by {book.author}</p>
          <div className="flex items-center gap-4 text-sm  mb-4">
            <span className="flex items-center gap-1">
              <Clock size={16} />
              {formatDate(book.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <User size={16} />
              {book.category}
            </span>
          </div>
          <p className="text-foreground/80 mb-6">{book.description}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <Review bookId={id} session={session} />
    </div>
  );
}
