import { formatDate } from "@/lib/utils";
import { trpc } from "@/trpc/server";
import Image from "next/image";
import React from "react";

interface ReviewDetailsProps {
  searchParams: Promise<{ reviewId: string }>;
}
export default async function ReviewDetails({
  searchParams,
}: ReviewDetailsProps) {
  const { reviewId } = await searchParams;
  const review = await trpc.review.getDetails({ id: reviewId });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-secondary shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Review Details</h1>

      <div className="flex items-center gap-4">
        <Image
          src={review.user.avatar || "/user-placeholder.png"}
          alt={review.user.name}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold">{review.user.name}</h2>
          <p className="text-foreground/70">Rating: ⭐{review.rating}/5</p>
        </div>
      </div>

      <div className="mt-4 p-4 border dark:border-white rounded-lg">
        <h3 className="font-semibold text-lg">Comment:</h3>
        <p className="text-foreground">{review.comment}</p>
      </div>

      <div className="mt-6">
        <p className="text-foreground/50 text-sm">
          Reviewed on: {formatDate(review.createdAt)}
        </p>
      </div>
    </div>
  );
}
