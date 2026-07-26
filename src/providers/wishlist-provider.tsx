"use client"
import { getWishlist } from '@/app/_actions/wishlist.actions'
import React, { createContext, useEffect, useState } from 'react'

interface WishlistContextType {
  wishlistItems: string[];
  setWishlistItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export const WishlistContext = createContext<WishlistContextType>({
  wishlistItems: [],
  setWishlistItems: () => { },
});

export default function WishlistContextProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<string[]>([])

  async function handleWishlist() {
    try {
      const response = await getWishlist()
      if (response.status === "success" && response.data) {
        const itemIds = response.data.map((item: any) => item._id || item.id);
        setWishlistItems(itemIds)
      } else {
        setWishlistItems([])
      }
    } catch (error) {
      console.error("Wishlist retrieval failed", error)
      setWishlistItems([])
    }
  }

  useEffect(() => {
    handleWishlist()
  }, [])

  return (
    <WishlistContext.Provider value={{ wishlistItems, setWishlistItems }}>
      {children}
    </WishlistContext.Provider>
  )
}
