import { Category } from "@/interfaces/category";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function Categories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
    {
      method: "GET",
    },
  );

  const data = await response.json();
  const categories: Category[] = data.data;
  console.log(categories);

  return (
    <>
      <div className="container mx-auto p-5">
        <div className="grid grid-cols-3 gap-6">
          {categories.map((category) => (
            <React.Fragment key={category._id}>
              <Link href={`/categories/${category._id}`}>
                <Card className="relative mx-auto w-full max-w-sm pt-0 hover:scale-105 duration-300">
                  <img
                    src={category.image}
                    alt="Event cover"
                    className="relative h-90 aspect-video w-full"
                  />
                  <CardHeader>
                    <CardAction>
                      <Badge variant="secondary">{category.slug}</Badge>
                    </CardAction>
                    <CardTitle>{category.name}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
