"use server";
import { getUserToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getAllReviews() {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/reviews", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch all reviews failed:", error);
    return { status: "error", message: "Failed to connect to the server" };
  }
}

export async function getReviewDetails(reviewId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return { data: null, status: "error", message: data?.message || "Failed to fetch review" };
    }
    return data;
  } catch (error) {
    console.error("Fetch review details failed:", error);
    return { data: null, status: "error", message: "Failed to connect to the server" };
  }
}

export async function addReviewToProduct(productId: string, reviewData: { review?: string, rating?: number }) {
  try {
    const token = await getUserToken();
    if (!token) {
      return { status: "error", message: "You Are Not Authorized to do this action" };
    }
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
      {
        method: "POST",
        body: JSON.stringify(reviewData),
        headers: {
          token: String(token),
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return { status: "error", message: data?.message || "Failed to add review" };
    }
    
    // Clear the cache for the product page so the new review shows immediately
    revalidatePath(`/products/${productId}`);
    
    return data;
  } catch (error) {
    console.error("Add review failed:", error);
    return { status: "error", message: "Failed to connect to the server" };
  }
}

export async function updateReview(reviewId: string, reviewData: { review?: string, rating?: number }) {
  try {
    const token = await getUserToken();
    if (!token) {
      return { status: "error", message: "You Are Not Authorized to do this action" };
    }
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
      {
        method: "PUT",
        body: JSON.stringify(reviewData),
        headers: {
          token: String(token),
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return { status: "error", message: data?.message || "Failed to update review" };
    }
    return data;
  } catch (error) {
    console.error("Update review failed:", error);
    return { status: "error", message: "Failed to connect to the server" };
  }
}

export async function deleteReview(reviewId: string) {
  try {
    const token = await getUserToken();
    if (!token) {
      return { status: "error", message: "You Are Not Authorized to do this action" };
    }
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
      {
        method: "DELETE",
        headers: {
          token: String(token),
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return { status: "error", message: data?.message || "Failed to delete review" };
    }
    return data;
  } catch (error) {
    console.error("Delete review failed:", error);
    return { status: "error", message: "Failed to connect to the server" };
  }
}
