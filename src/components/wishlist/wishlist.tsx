"use client";
import React, { useContext, useEffect, useState } from "react";
import { getWishlist, removeProductFromWishlist } from "@/app/_actions/wishlist.actions";
import { ProductI } from "@/interfaces/product";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Trash2 } from "lucide-react";
import AddCartButton from "../products/addToCartBtn";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { WishlistContext } from "@/providers/wishlist-provider";

export default function WishlistComponent() {
  const [products, setProducts] = useState<ProductI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setWishlistItems } = useContext(WishlistContext);

  async function fetchWishlist() {
    try {
      const response = await getWishlist();
      if (response.status === "success") {
        setProducts(response.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load wishlist");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function removeItem(id: string) {
    try {
      const response = await removeProductFromWishlist(id);
      if (response.status === "success") {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        setWishlistItems((prev) => prev.filter((itemId) => itemId !== id));
        toast.success("Removed from wishlist");
      }
    } catch (error) {
      toast.error("Failed to remove item");
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold mb-8">My Wishlist</h2>
      {products.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="size-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-6">Explore our products and add your favorites here!</p>
          <Link href="/products" className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          {products.map((product) => (
            <div key={product._id} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
              <Card className="h-full flex flex-col relative group">
                <Link href={`/products/${product._id}`}>
                  <Image width={1000} height={1000} src={product.imageCover} alt={product.title} className="w-full object-cover h-60" />
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg line-clamp-1">{product.title}</CardTitle>
                    <CardDescription>{product.category?.name}</CardDescription>
                    <h4 className="card-price text-foreground font-bold mt-2">EGP: {product.price}</h4>
                  </CardHeader>
                </Link>
                <CardFooter className="p-4 pt-0 mt-auto w-full flex items-center gap-3">
                  <AddCartButton prodId={product._id} />
                  <button 
                    onClick={() => removeItem(product._id)}
                    className="p-2 rounded-full text-muted-foreground hover:text-destructive hover:bg-muted transition-all"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="size-5" />
                  </button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
