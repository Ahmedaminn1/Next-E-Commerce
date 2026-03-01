'use client'
import { Button } from "@/components/ui/button";
import { decrement, increametByAmount } from "@/redux/slices/counterSlices";
import { productsAction } from "@/redux/slices/ProductsSlices";
import { AppDispatcher, RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { count } = useSelector((state: RootState) => state.counter)
  const { products } = useSelector((state: RootState) => state.product)
  console.log(products);
  console.log(count);

  return (
    <>
      <title>ShopMart | Home</title>
      <section className="text-center min-h-screen flex justify-center items-center flex-col">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 px-4">Welcome to ShopMart</h1>
        <p className="capitalize text-lg md:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">Discover the latest technology, fashion, and lifestyle products.
          quality quaranteed with fast shipping and excellent customer service.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
          <Button className="px-10 py-6 text-lg rounded-xl">
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button className="px-10 py-6 text-lg rounded-xl" variant={"outline"}>
            <Link href="/categories">Browse Categories</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
