import { ProductI } from "@/interfaces/product";
import { Params } from "next/dist/server/request/params";
import React from "react";
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


import AddCartButton from "@/components/products/addToCartBtn";

export default async function ProductDetails({ params }: { params: Promise<Params> }) {
  const { productId } = await params
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
  const data = await response.json();
  const { data: product } = data as { data: ProductI }

  const relatedProducts = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${product.category._id}`)
  const data1 = await relatedProducts.json()
  const related: ProductI[] = data1.data


  return (
    <>
      <main>
        <div className="container mx-auto">
          <Breadcrumb className="py-5">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link className="text-lg" href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link className="text-lg" href="/products">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-lg font-medium">Product Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Card className="grid grid-cols-3 mt-10">

            <div className="col-span-1">
              <Carousel>
                <CarouselContent>
                  {product.images.map((img, index) =>
                    <CarouselItem key={index} >
                      <Image width={1000} height={1000} src={img} alt="product" className="w-full object-cover h-90" />
                    </CarouselItem>
                  )}
                </CarouselContent>
              </Carousel>
            </div>

            <div className="col-span-2 flex justify-center items-center flex-col gap-10">
              <div className="w-full">
                <CardHeader>
                  <h4 className="card-brand text-muted-foreground">{product.brand.name}</h4>
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                  <h4 className="card-description">{product.description}</h4>
                  <CardDescription>{product.category.name}</CardDescription>
                  <h4 className="card-price text-foreground font-bold">EGP: {product.price}</h4>
                </CardHeader>
                <CardContent className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star, index) => {
                    const filledStar = index < Math.floor(product.ratingsAverage)
                    return <React.Fragment key={index}>
                      <Star className={`${filledStar ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground fill-muted-foreground"}`} />
                    </React.Fragment>
                  })}
                  <span className="text-muted-foreground">({product.ratingsAverage})</span>
                </CardContent>
              </div>
              <CardFooter className="gap-3 w-full">
                <AddCartButton prodId={product.id} />
                <Heart className="size-7" />
              </CardFooter>
            </div>
          </Card>

          <div className="mt-20">
            <h3 className="text-2xl font-bold mb-6">Related Products</h3>
            <Carousel className="w-full">
              <CarouselContent className="-ml-1">
                {related.map((relate) => (
                  <CarouselItem key={relate._id} className="pl-1 md:basis-1/2 lg:basis-1/4">
                    <div className="p-1">
                      <Card className="h-full flex flex-col">
                        <Link href={`/products/${relate._id}`}>
                          <Image
                            width={500}
                            height={500}
                            src={relate.imageCover}
                            alt={relate.title}
                            className="w-full object-cover h-60"
                          />
                          <CardHeader className="p-4">
                            <h4 className="text-xs text-muted-foreground">{relate.brand.name}</h4>
                            <CardTitle className="text-sm line-clamp-1">{relate.title}</CardTitle>
                            <CardDescription className="text-xs">{relate.category.name}</CardDescription>
                            <h4 className="text-sm font-bold mt-2 text-foreground">EGP: {relate.price}</h4>
                          </CardHeader>
                        </Link>
                        <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center gap-2">
                          <AddCartButton prodId={relate._id} />
                          <Heart className="size-5 cursor-pointer hover:text-red-500 transition-colors" />
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </main>
    </>
  )
}
