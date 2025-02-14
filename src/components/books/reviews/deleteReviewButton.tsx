"use client";

import { trpc } from "@/trpc/client";

interface DeleteReviewProps {
  reviewId: string;
}

export default function DeleteReviewButton({ reviewId }: DeleteReviewProps) {
  const utils = trpc.useUtils();

  const deleteReviewMutation = trpc.review.delete.useMutation({
    onSuccess: async () => {
      await utils.review.invalidate();
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
