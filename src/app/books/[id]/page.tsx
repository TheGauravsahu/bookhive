import { trpc } from "@/trpc/server";
import Image from "next/image";
import React from "react";
import { Star, Clock, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BookDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function BookDetails({ params }: BookDetailsProps) {
  const { id } = await params;
  const book = await trpc.book.getDetails({ id });

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
            <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {formatDate(book.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <User size={16} />
                {book.category}
              </span>
            </div>
            <p className="text-gray-700 mb-6">{book.description}</p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          {book.reviews.length > 0 ? (
            <div className="space-y-6">
              {book.reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center gap-4 mb-2">
                    {review.user.avatar && (
                      <Image
                        src={review.user.avatar}
                        width={40}
                        height={40}
                        alt={review.user.name}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{review.user.name}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm  ml-auto">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
  );
}
