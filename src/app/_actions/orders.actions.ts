"use server"

import { OrdersI } from "@/interfaces/orders";

export async function getUserOrders(userId?: string | null) {
    if (!userId) {
        return [];
    }

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
        if (!response.ok) {
            console.error("Failed to fetch orders:", response.statusText);
            return [];
        }
        const data = await response.json();
        const orders: OrdersI[] = Array.isArray(data) ? data : (data?.data || []);
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
}
