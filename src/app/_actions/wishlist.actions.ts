"use server"
import { getUserToken } from "@/lib/auth";

export async function addToWishlist(productId: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You Are Not Authorized to do this action");
  }
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    body: JSON.stringify({ productId: productId }),
    headers: {
      token: String(token),
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return { status: "error", message: "Failed to add to wishlist" };
  }
  const data = await response.json();
  return data;
}

export async function getWishlist() {
  const token = await getUserToken();
  if (!token) {
    return { status: "error", message: "Not Authorized" };
  }
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "GET",
    headers: {
      token: String(token),
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return { status: "error", message: "Failed to fetch wishlist" };
  }
  const data = await response.json();
  return data;
}

export async function removeProductFromWishlist(productId: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You Are Not Authorized to do this action");
  }
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: String(token),
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
}
