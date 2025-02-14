"use client";

import { trpc } from "@/trpc/client";

export default function DeleteReviewButton({ reviewId }: { reviewId: string }) {
  const utils = trpc.useUtils();

  const deleteReviewMutation = trpc.review.delete.useMutation({
    onSettled: () => {
      utils.book.getDetails.invalidate();
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
