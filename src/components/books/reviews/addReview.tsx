"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addReviewSchema } from "./review.schema";

type AddReviewFormValues = z.infer<typeof addReviewSchema>;

interface AddReviewProps {
  bookId: string;
}

export default function AddReview({ bookId }: AddReviewProps) {
  const addReviewForm = useForm<AddReviewFormValues>({
    resolver: zodResolver(addReviewSchema),
    defaultValues: {
      review: "",
      bookId,
    },
  });

  const utils = trpc.useUtils();

  const addReviewMutation = trpc.review.add.useMutation({
    onSuccess: () => {
      utils.book.getDetails.invalidate();
      addReviewForm.reset();
    },
  });

  function onSubmit(values: AddReviewFormValues) {
    addReviewMutation.mutate(values);
  }

  return (
    <Form {...addReviewForm}>
      <form
        className="space-y-2 lg:p-8 p-4"
        onSubmit={addReviewForm.handleSubmit(onSubmit)}
      >
        <FormField
          control={addReviewForm.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Add review</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="outline" className="mt-1">
          {addReviewMutation.isPending ? "Adding..." : "Add"}
        </Button>
      </form>
    </Form>
  );
}
