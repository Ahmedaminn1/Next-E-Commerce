"use server";
export async function getAllBrands() {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
        next: { revalidate: 3600 }, // Cache for 1 hour
    });
    const data = await response.json();
    return data;
}