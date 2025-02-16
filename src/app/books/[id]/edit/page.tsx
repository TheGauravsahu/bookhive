import EditBookForm from "@/components/books/editBook/editBook-form";
import { trpc } from "@/trpc/server";
import React from "react";

interface EditBookProps {
  params: Promise<{ id: string }>;
}

export default async function EditBook({ params }: EditBookProps) {
  const { id } = await params;

  void trpc.book.getDetails.prefetch({ id });
  return (
    <div className="md:max-w-3xl max-w-[85%] mx-auto my-auto">
      <h1 className="font-semibold text-2xl my-4">Edit Book</h1>
      <EditBookForm id={id} />
    </div>
  );
}
