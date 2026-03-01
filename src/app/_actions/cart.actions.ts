"use server"
import { getUserToken } from "@/lib/auth";
import { checkoutSchemaType } from "@/schema/auth.schema";

export async function addToCart(productId: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You Are Not Authorized to do this action")
  }
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    body: JSON.stringify({ productId: productId }),
    headers: {
      token: String(token),
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return { status: "error", message: "Failed to add to cart" };
  }
  const data = await response.json();
  return data;
}

export async function getCart() {
  const token = await getUserToken();
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "GET",
    headers: {
      token: String(token),
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return { status: "error", message: "Failed to fetch cart" };
  }
  const data = await response.json();
  return data;
}

export async function updateProductCount(productId: string, count: number) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You Are Not Authorized to do this action");
  }
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "PUT",
      body: JSON.stringify({ count: count }),
      headers: {
        token: String(token),
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  // console.log(data);
  
  return data;
}

export async function removeProductFromCart(productId: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You Are Not Authorized to do this action");
  }
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
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

export async function clearCart() {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You Are Not Authorized to do this action");
  }
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "DELETE",
    headers: {
      token: String(token),
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return { message: "error", error: "Failed to clear cart" };
  }
  const data = await response.json();
  return data;
}

export async function checkoutUsers(formData :checkoutSchemaType, cartId:string) {
  const token = await getUserToken(); 
  if (!token) {
    throw new Error("You Are Not Authorized to do this action");
  }
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
    method: "POST",
    body:JSON.stringify(formData),
    headers: {
      token: String(token),
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return { message: "error", error: "Failed to clear cart" };
  }
  const data = await response.json();
  return data;
}
