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
import DeleteReviewButton from "./deleteReviewButton";
import { formatDate } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";

type AddReviewFormValues = z.infer<typeof addReviewSchema>;

interface AddReviewProps {
  bookId: string;
}

export default function Review({ bookId }: AddReviewProps) {
  const [reviews] = trpc.review.getAll.useSuspenseQuery({ bookId });

  const addReviewForm = useForm<AddReviewFormValues>({
    resolver: zodResolver(addReviewSchema),
    defaultValues: {
      review: "",
      bookId,
    },
  });

  const utils = trpc.useUtils();

  const addReviewMutation = trpc.review.add.useMutation({
    onSuccess: async () => {
      await utils.review.invalidate();
      addReviewForm.reset();
    },
    onError: (error) => {
      console.error("Failed to add review:", error);
    },
  });

  function onSubmit(values: AddReviewFormValues) {
    addReviewMutation.mutate(values);
  }

  return (
    <div>
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

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex items-center gap-4 mb-2">
                  {review.user.avatar && (
                    <Image
                      src={review.user.avatar}
                      width={40}
                      height={40}
                      alt={review.user.name}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{review.user.name}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm  ml-auto flex flex-col gap-1">
                    <span>{formatDate(review.createdAt)}</span>
                    <DeleteReviewButton reviewId={review.id} />
                  </div>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
