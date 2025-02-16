"use client";
import { trpc } from "@/trpc/client";
import Link from "next/link";

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
    <div className="flex items-center  gap-2 border-t mt-2 py-1">
      <Link
        prefetch={true}
        href={"/books/" + bookId + "/edit"}
        className="text-sm hover:underline cursor-pointer text-foreground/90"
      >
        Update
      </Link>
      <span
        onClick={async () => {
          await deleteBookMutation.mutate({ bookId });
        }}
        className="text-sm hover:underline cursor-pointer text-red-400/90"
      >
        Delete
      </span>
    </div>
  );
}
