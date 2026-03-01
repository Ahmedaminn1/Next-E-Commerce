"use client"
import { getCart } from '@/app/_actions/cart.actions'
import React, { createContext, useEffect, useState } from 'react'

interface CartContextType {
  noOfCartItems: number;
  setnoOfCartItems: React.Dispatch<React.SetStateAction<number>>;
}

export const CartContext = createContext<CartContextType>({
  noOfCartItems: 0,
  setnoOfCartItems: () => { },
});

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [noOfCartItems, setnoOfCartItems] = useState(0)

  async function handleCart() {
    try {
      const response = await getCart()
      if (response.status === "success" && response.data?.products) {
        const total = response.data.products.reduce((acc: number, item: any) => acc + (item.count || 0), 0)
        setnoOfCartItems(total)
      } else {
        setnoOfCartItems(0)
      }
    } catch (error) {
      console.error("Cart retrieval failed", error)
      setnoOfCartItems(0)
    }
  }

  useEffect(() => {
    handleCart()
  }, [])

  return (
    <CartContext.Provider value={{ noOfCartItems, setnoOfCartItems }}>
      {children}
    </CartContext.Provider>
  )
}
