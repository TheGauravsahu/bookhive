"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { EditBookFormValues, editBookSchema } from "./editBook.schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Uploader from "@/components/uploader";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface EditBookProps {
  id: string;
}
export default function EditBookForm({ id }: EditBookProps) {
  const { data: book } = trpc.book.getDetails.useQuery({ id });
  const utils = trpc.useUtils();
  const router = useRouter();

  const editBookForm = useForm<EditBookFormValues>({
    resolver: zodResolver(editBookSchema),
    defaultValues: {
      bookId: id,
      title: book?.title,
      description: book?.description,
      author: book?.author,
      category: book?.category,
      coverImage: book?.coverImage,
    },
  });

  useEffect(() => {
    if (book) {
      editBookForm.reset({
        bookId: id,
        title: book.title,
        description: book.description,
        author: book.author,
        category: book.category,
        coverImage: book.coverImage,
      });
    }
  }, [book, editBookForm, id]);

  const onUploadSuccess = (url: string) => {
    editBookForm.setValue("coverImage", url);
  };

  // edit book
  const editBookMutation = trpc.book.edit.useMutation({
    onSuccess: (data) => {
      console.log("Book edited:", data);
      toast.success("Book edited successfully.");
      utils.book.invalidate();
      router.push("/books/" + id);
    },
    onError: (error) => {
      console.error("Failed to edit book:", error.message);
    },
  });
  const onSubmit = async (values: EditBookFormValues) => {
    editBookMutation.mutate(values);
  };

  return (
    <Form {...editBookForm}>
      <form onSubmit={editBookForm.handleSubmit(onSubmit)} className="space-y-6">
        {" "}
        {/* title */}
        <FormField
          control={editBookForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* description */}
        <FormField
          control={editBookForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripiton</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* author */}
        <FormField
          control={editBookForm.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter author's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* category */}
        <FormField
          control={editBookForm.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fiction">Fiction</SelectItem>
                    <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* cover image */}
        <FormField
          control={editBookForm.control}
          name="coverImage"
          render={() => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <Uploader onUploadSuccess={onUploadSuccess} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={editBookMutation.isPending}
          className={
            editBookMutation.isPending ? "cursor-progress" : "cursor-pointer"
          }
        >
          {editBookMutation.isPending ? "Editing" : "Edit"}
        </Button>
      </form>
    </Form>
  );
}
