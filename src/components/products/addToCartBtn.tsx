"use client"
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/app/_actions/cart.actions";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { CartContext } from "@/providers/cart-provider";
import { redirect } from "next/navigation";


export default function AddCartButton({ prodId }: { prodId: string }) {
  const [isLoading, setisLoading] = useState(false);
  const { setnoOfCartItems } = useContext(CartContext);
  async function addProductToCart(productId: string) {
    try {
      setisLoading(true);
      const response = await addToCart(productId);
      console.log(response);
      if (response?.status === "success" || response?.message === "success") {
        const total = response.data.products.reduce((acc: number, item: any) => acc + item.count, 0)
        setnoOfCartItems(total)
        toast.success(response.message, { position: "top-center" });
      } else {
        toast.success("Product added to cart");
      }
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message, { position: "top-center" });
      redirect("/login")
    } finally {
      setisLoading(false);
    }
  }

  return (
    <>
      <Button
        onClick={() => {
          addProductToCart(prodId);
        }}
        className="grow cursor-pointer"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Spinner /> Adding...
          </>
        ) : (
          <>
            <ShoppingCart /> Add to Cart
          </>
        )}
      </Button>
    </>
  );
}
