"use server";
import { Params } from "next/dist/server/request/params";

export async function getAllProducts() {
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/products");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Products fetch failed:", error);
        return { status: "error", message: "Failed to connect to the server" };
    }
}

export async function getProductDetails({ params }: { params: Promise<Params> }) {
    try {
        const { productId } = await params;
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
        const data = await response.json();
        if (!response.ok) return { data: null, status: "error", message: data?.message || "Failed to fetch product" };
        return data;
    } catch (error) {
        console.error("Product details fetch failed:", error);
        return { data: null, status: "error", message: "Failed to connect to the server" };
    }
}
