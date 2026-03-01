import { ProductI } from "@/interfaces/product";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import AddCartButton from "@/components/products/addToCartBtn";
import { getAllProducts } from "@/app/_actions/products.actions";

export default async function Products() {
  // const response = await fetch(
  //   "https://ecommerce.routemisr.com/api/v1/products",
  //   {
  //     method: "GET",
  //   }
  // );
  // const data = await response.json();
  // const products: ProductI[] = data.data;

  const { data } = await getAllProducts()

  return (
    <>
      <title>ShopMart | Products</title>
      <main>
        <div className="container mx-auto p-5">
          <div className="grid grid-cols-12 gap-6">
            {data.map((product: ProductI) => <React.Fragment key={product._id}>
              <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                <Card>
                  <Link href={`/products/${product._id}`}>
                    <Image width={1000} height={1000} src={product.imageCover} alt="product" className="w-full object-cover h-90" />
                    <CardHeader>
                      <h4 className="card-brand text-muted-foreground">{product.brand.name}</h4>
                      <CardTitle className="text-xl">{product.title}</CardTitle>
                      <CardDescription>{product.category.name}</CardDescription>
                      <h4 className="card-price text-foreground font-bold">EGP: {product.price}</h4>
                    </CardHeader>
                    +
                    <CardContent className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star, index) => {
                        const filledStar = index < Math.floor(product.ratingsAverage)
                        return <React.Fragment key={index}>
                          <Star className={`${filledStar ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground fill-muted-foreground"}`} />
                        </React.Fragment>
                      })}
                      <span className="text-muted-foreground">({product.ratingsAverage})</span>
                    </CardContent>
                  </Link>
                  <CardFooter className="gap-3">
                    <AddCartButton prodId={product._id} />
                    <Heart className="size-7" />
                  </CardFooter>
                </Card>
              </div>
            </React.Fragment>)}
          </div>
        </div>
      </main>
    </>
  );
}
