"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addReviewToProduct } from "@/app/_actions/reviews.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddReviewForm({ productId }: { productId: string }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!review || !rating) {
      toast.error("Please provide both a rating and a review.");
      return;
    }

    const numRating = Number(rating);
    if (numRating < 1 || numRating > 5) {
      toast.error("Rating must be between 1 and 5.");
      return;
    }

    setIsSubmitting(true);
    const result = await addReviewToProduct(productId, { review, rating: numRating });
    setIsSubmitting(false);

    if (result.status === "error") {
      toast.error(result.message || "Failed to add review. Make sure you're logged in.");
    } else {
      toast.success("Review added successfully!");
      setReview("");
      setRating("");
      // Refresh the page to show the new review
      router.refresh();
    }
  };

  return (
    <div className="mb-10 p-6 bg-card rounded-lg border shadow-sm">
      <h4 className="text-lg font-bold mb-4">Write a Review</h4>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="rating">Rating (1-5)</Label>
          <Input
            id="rating"
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="5"
            required
            className="w-full sm:w-1/4"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="review">Your Review</Label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="What did you like or dislike?"
            required
            className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-fit">
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  );
}
