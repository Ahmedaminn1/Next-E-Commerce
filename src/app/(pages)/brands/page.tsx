import { getAllBrands } from "@/app/_actions/brands.actions";
import { Brand } from "@/interfaces/brands";
import Image from "next/image";
import React from "react";

export default async function Brands() {
  const { data } = await getAllBrands();


  return (
    <>
      <title>ShopMart | Brands</title>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Brands</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data.map((brand: Brand) => (
            <div
              key={brand._id}
              className="group flex flex-col items-center justify-center p-6 bg-card border rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-full h-32 mb-4">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                {brand.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
