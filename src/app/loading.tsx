import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import React from 'react'
import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4">
      
      <div className="loading-section flex items-center gap-2">
        <Avatar className="rounded bg-black p-4 text-white font-bold text-xl">
          <AvatarFallback className='text-2xl'>S</AvatarFallback>
        </Avatar>
        <h2 className="text-3xl font-bold">ShopMart</h2>
      </div>

      <Spinner className="size-8" />

    </main>
  )
}
