"use client";

import { trpc } from "@/trpc/client";

interface DeleteReviewProps {
  reviewId: string;
  bookId: string;
}

export default function DeleteReviewButton({
  reviewId,
  bookId,
}: DeleteReviewProps) {
  const utils = trpc.useUtils();

  const deleteReviewMutation = trpc.review.delete.useMutation({
    onSuccess: () => {
      utils.book.getDetails.invalidate({ id: bookId });
    },
  });
  return (
    <span
      onClick={async () => {
        deleteReviewMutation.mutate({ reviewId });
      }}
      className="text-red-400 hover:underline cursor-pointer"
    >
      Delete
    </span>
  );
}
