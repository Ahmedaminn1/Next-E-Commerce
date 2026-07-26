"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getWishlist } from "@/app/_actions/wishlist.actions";
import { setWishlistItems } from "@/redux/slices/wishlistSlice";

export default function WishlistInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await getWishlist();
        if (response.status === "success" && response.data) {
          const itemIds = response.data.map((item: any) => item._id || item.id);
          dispatch(setWishlistItems(itemIds));
        } else {
          dispatch(setWishlistItems([]));
        }
      } catch (error) {
        console.error("Wishlist retrieval failed", error);
        dispatch(setWishlistItems([]));
      }
    }

    fetchWishlist();
  }, [dispatch]);

  return null;
}
