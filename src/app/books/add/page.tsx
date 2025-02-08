import AddBookForm from "@/components/books/addBook/addBook-form";
import React from "react";

export default function AddBooks() {
  return (
    <div className="md:max-w-3xl max-w-[85%] mx-auto my-auto">
      <h1 className="font-semibold text-2xl my-4">Add Book</h1>
      <AddBookForm />
    </div>
  );
}
