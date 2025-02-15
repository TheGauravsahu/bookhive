"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddBookFormValues, addBookSchema } from "./addBook.schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

export default function AddBookForm() {
  const router = useRouter();
  const utils = trpc.useUtils();

  const addBookForm = useForm<AddBookFormValues>({
    resolver: zodResolver(addBookSchema),
    defaultValues: {
      title: "",
      description: "",
      coverImage: "",
      author: "",
      category: "",
    },
  });

  const onUploadSuccess = (url: string) => {
    addBookForm.setValue("coverImage", url);
  };

  const createbookMutation = trpc.book.add.useMutation({
    onSuccess: (data) => {
      console.log("Book added:", data);
      toast.success("Book added successfully.");
      utils.book.invalidate();
      router.push("/books");
    },
    onError: (error) => {
      console.error("failed to add book:", error.message);
    },
  });
  
  function onSubmit(values: AddBookFormValues) {
    createbookMutation.mutate(values);
  }

  return (
    <Form {...addBookForm}>
      <form onSubmit={addBookForm.handleSubmit(onSubmit)} className="space-y-8">
        {/* title */}
        <FormField
          control={addBookForm.control}
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
          control={addBookForm.control}
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
          control={addBookForm.control}
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
          control={addBookForm.control}
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
          control={addBookForm.control}
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

        <Button type="submit" disabled={createbookMutation.isPending} className={createbookMutation.isPending ? "cursor-progress" : "cursor-pointer"}>
          {createbookMutation.isPending ? "Adding" : "Add"}
        </Button>
      </form>
    </Form>
  );
}
