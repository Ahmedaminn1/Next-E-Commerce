"use client";
import React, { useContext, useState } from "react";
import { Heart } from "lucide-react";
import { WishlistContext } from "@/providers/wishlist-provider";
import { addToWishlist, removeProductFromWishlist } from "@/app/_actions/wishlist.actions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function AddToWishlistBtn({ prodId }: { prodId: string }) {
  const { wishlistItems, setWishlistItems } = useContext(WishlistContext);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const inWishlist = wishlistItems.includes(prodId);

  async function handleToggleWishlist(e: React.MouseEvent) {
    e.preventDefault(); // Prevent navigating if wrapped in a link
    e.stopPropagation();

    if (!session) {
      toast.error("Please login to manage your wishlist");
      return;
    }

    setLoading(true);
    try {
      if (inWishlist) {
        const res = await removeProductFromWishlist(prodId);
        if (res?.status === "success") {
          toast.success("Removed from wishlist");
          setWishlistItems((prev) => prev.filter((id) => id !== prodId));
        } else {
          toast.error(res?.message || "Failed to remove from wishlist");
        }
      } else {
        const res = await addToWishlist(prodId);
        if (res?.status === "success") {
          toast.success("Added to wishlist");
          setWishlistItems((prev) => [...prev, prodId]);
        } else {
          toast.error(res?.message || "Failed to add to wishlist");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={loading}
      className={`p-2 rounded-full transition-colors ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-muted"}`}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={`size-7 transition-colors ${
          inWishlist ? "fill-red-500 text-red-500" : "text-muted-foreground"
        }`}
      />
    </button>
  );
}
