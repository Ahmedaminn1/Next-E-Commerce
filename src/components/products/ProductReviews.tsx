import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import AddReviewForm from "./AddReviewForm";

interface ReviewI {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

export default async function ProductReviews({ productId }: { productId: string }) {
  let reviews: ReviewI[] = [];
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`, {
      cache: "no-store"
    });
    if (res.ok) {
      const data = await res.json();
      reviews = data.data || [];
    }
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
  }

  return (
    <div className="mt-20">
      <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
      <AddReviewForm productId={productId} />
      {reviews.length === 0 ? (
        <p className="text-muted-foreground">No reviews yet for this product.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <Card key={rev._id} className="flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>{rev.user.name}</span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= rev.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted-foreground fill-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </CardTitle>
                <div className="text-xs text-muted-foreground">
                  {new Date(rev.createdAt).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-sm">{rev.review}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
