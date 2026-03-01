import React from 'react'
import Link from 'next/link'
import {
  Item,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item"
import { Button } from '@/components/ui/button'
import { getUserOrders } from '../_actions/orders.actions'
import { getUserId } from '@/lib/auth'

export default async function allOrders() {
  const userId = await getUserId()

  const orders = await getUserOrders(userId)

  return (
    <div className="container mx-auto px-4 py-8 mb-20 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">All Orders</h1>

      {!orders || orders.length === 0 ? (
        <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
          <p className="text-muted-foreground font-medium">No orders found in your history.</p>
          <Link href="/products" className="inline-block mt-4">
            <Button variant="outline">Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            return (
              <Item key={order._id} variant="outline" className="p-8 block rounded-xl border-muted-foreground/10 hover:shadow-sm transition-shadow bg-card shadow-sm">
                <ItemContent className="p-0">
                  <ItemTitle className="text-xl font-bold mb-4 block">
                    Order #{order.id || order._id.slice(-5).toUpperCase()}
                  </ItemTitle>

                  <div className="space-y-1 text-sm text-foreground/80">
                    <p>
                      Order Date: <span className="font-medium text-foreground">{new Date(order.createdAt).toLocaleString()}</span>
                    </p>
                    <p>
                      Payment: {order.paymentMethodType}
                      {order.isPaid ? (
                        <span className="text-green-600 font-bold ml-1">(Paid)</span>
                      ) : (
                        <span className="text-destructive font-bold ml-1">(Unpaid)</span>
                      )}
                    </p>
                    <p>
                      Delivered: {order.isDelivered ? (
                        <span className="text-green-600 font-bold">Yes</span>
                      ) : (
                        <span className="text-red-500 font-bold">No</span>
                      )}
                    </p>
                    <p className="text-base mt-2">
                      Total: <span className="font-bold text-foreground">{order.totalOrderPrice} EGP</span>
                    </p>
                  </div>

                  <div className="mt-6">
                    <p className="font-bold text-sm mb-1 uppercase tracking-tight text-foreground/90">Shipping Address</p>
                    <div className="text-sm text-foreground/70 leading-relaxed">
                      <p>{order.shippingAddress.city}, {order.shippingAddress.details || "Egypt"}</p>
                      <p>Phone: {order.shippingAddress.phone}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-end">
                    <Button variant="secondary" size="sm" className="h-8 rounded-md bg-muted hover:bg-muted/80 text-foreground/90 font-medium px-4">
                      View Order Items
                    </Button>
                    <p className="text-[11px] text-muted-foreground italic">
                      Last updated: {new Date(order.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </ItemContent>
              </Item>
            )
          })}
        </div>
      )}
    </div>
  )
}
