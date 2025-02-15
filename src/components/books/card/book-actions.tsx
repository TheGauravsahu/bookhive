"use client";
import { trpc } from "@/trpc/client";

interface BookActionsProps {
  bookId: string;
}
export default function BookActions({ bookId }: BookActionsProps) {
  const utils = trpc.useUtils();
  
  const deleteBookMutation = trpc.book.delete.useMutation({
    onSuccess: async () => {
      await utils.book.invalidate();
    },
    onError: async (error) => {
      console.log("Failed to delete book:", error);
    },
  });

  return (
    <div>
      <span
        onClick={async () => {
          await deleteBookMutation.mutate({ bookId });
        }}
        className="text-sm hover:underline cursor-pointer text-red-400"
      >
        Delete
      </span>
    </div>
  );
}
