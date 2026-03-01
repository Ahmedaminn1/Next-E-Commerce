import { Badge } from '@/components/ui/badge'
import { Category } from '@/interfaces/category'
import { Subcategory } from '@/interfaces/subCategory'
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"


export default async function CategoriesId({ params }: { params: Promise<Params> }) {

    const {categoryId} = await params
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`)
    const data = await response.json()
    const category:Category = data.data
    console.log(category);

    const repsonce = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)
    const dataa = await repsonce.json()
    const subCategory: Subcategory[] = dataa.data
    console.log(subCategory);
    
  return (
    <>
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img
      src= {category.image}
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold">{category.name}</h1>
      <Badge className='mt-5'>{category.slug}</Badge>
    </div>
  </div>
    </div>

    <hr />
    
    <div className="container mx-auto py-5">
      <div className="subCategory text-4xl font-black mt-5">SubCategory</div>

      <div className="grid grid-cols-3 mt-5 gap-6">

      {subCategory.map((sub)=><React.Fragment key={sub._id}>
      <Card className="mx-auto w-full max-w-sm hover:scale-105 duration-300">
      <CardHeader>
        <CardTitle>{sub.name}</CardTitle>
        <CardDescription>
          {sub.category}
        </CardDescription>
      </CardHeader>
      <CardFooter className='flex flex-col gap-3'>
        <Badge>{sub.slug}</Badge>
      <p className='text-red-500 font-bold'>
        <span className='text-black'>Created At :</span> {sub.createdAt}
      </p>
      </CardFooter>
    </Card>
      </React.Fragment>)}
      </div>
    </div>
    </>
  )
}
