"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  clearCart,
  getCart,
  removeProductFromCart,
  updateProductCount,
} from "@/app/_actions/cart.actions";
import {  Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import { Spinner } from "../ui/spinner";
import { CartDataI } from "@/interfaces/cart";
import { CartContext } from "@/providers/cart-provider";
import { Checkout } from "./checkout";

export default function CartComponent() {
  const [products, setProducts] = useState<CartDataI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setnoOfCartItems } = useContext(CartContext);
  const [updatingItems, setUpdatingItems] = useState<Record<string, boolean>>(
    {},
  );

  async function fetchCart() {
    try {
      const data = await getCart();
      if (data.status === "success") {
        setProducts(data.data);
        const total = data.data.products.reduce((acc: number, item: any) => acc + item.count, 0)
        setnoOfCartItems(total);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load cart");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchCart();
  }, []);

  async function updateCount(id: string, count: number) {
    if (count < 1) return;
    setUpdatingItems((prev) => ({ ...prev, [id]: true }));
    try {
      const data = await updateProductCount(id, count);
      if (data.status === "success") {
        setProducts(data.data);
        const total = data.data.products.reduce((acc: number, item: any) => acc + item.count, 0)
        setnoOfCartItems(total);
        toast.success("Cart updated");
      } else {
        toast.error("Failed to update cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [id]: false }));
    }
  }

  async function removeItem(id: string) {
    setUpdatingItems((prev) => ({ ...prev, [id]: true }));
    try {
      const data = await removeProductFromCart(id);
      if (data.status === "success") {
        setProducts(data.data);
        const total = data.data.products.reduce((acc: number, item: any) => acc + item.count, 0)
        setnoOfCartItems(total);
        toast.success("Item removed");
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [id]: false }));
    }
  }

  async function clearAllCart() {
    setIsLoading(true);
    try {
      const data = await clearCart();
      if (data.message === "success") {
        setProducts(null);
        setnoOfCartItems(0);
        toast.success("Cart cleared", { "position": "top-center" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to clear cart", { "position": "top-center" });
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center gap-5 min-h-[50vh]">
        <Spinner /> Loading
      </div>
    );
  }

  if (!products || products.products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Link href="/products">
          <Button>Continue Shopping <ShoppingCart /></Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
      <p className="text-muted-foreground mb-8">
        {products.products.reduce((acc, item) => acc + item.count, 0)} items in your cart
      </p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {products.products.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row gap-4 p-4 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-full md:w-32 h-32 shrink-0 bg-muted rounded-md overflow-hidden">
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-2 pr-4">
                      {item.product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.product.category.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      EGP {item.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">each</p>
                  </div>
                </div>

                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center gap-2">
                    {/* minus button */}
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      disabled={
                        item.count <= 1 || updatingItems[item.product.id]
                      }
                      onClick={() =>
                        updateCount(item.product.id, item.count - 1)
                      }
                    >
                      {updatingItems[item.product.id] ? (
                        <Spinner className="h-4 w-4" />
                      ) : (
                        <Minus className="h-4 w-4" />
                      )}
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {updatingItems[item.product.id] ? (
                        <Spinner className="h-4 w-4 mx-auto" />
                      ) : (
                        item.count
                      )}
                    </span>
                    {/* plus button */}
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      disabled={updatingItems[item.product.id]}
                      onClick={() =>
                        updateCount(item.product.id, item.count + 1)
                      }
                    >
                      {updatingItems[item.product.id] ? (
                        <Spinner className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 h-auto p-0 px-2"
                    onClick={() => removeItem(item.product.id)}
                    disabled={updatingItems[item.product.id]}
                  >
                    {updatingItems[item.product.id] ? (
                      <>
                        <Spinner /> Removing...
                      </>
                    ) : (
                      "Remove"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card border rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({products.products.reduce((acc, item) => acc + item.count, 0)} items)</span>
                <span className="font-semibold">
                  EGP {products.totalCartPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl">
                  EGP {products.totalCartPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mb-3">
              <Link href="/products" className="w-full block">
                <Button variant="outline" className="w-full bg-card hover:bg-muted text-foreground border-border">
                  Continue Shopping
                </Button>
              </Link>
            </div>
              {products && <Checkout cartId = {products?._id}/>}
          </div>

          <div className="mt-4 flex justify-end">
            <Button variant="outline" className="text-red-500 border-red-200 rounded-xl hover:bg-red-50 hover:text-red-600 gap-2" onClick={clearAllCart}>
              <Trash2 className="h-4 w-4" /> Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
