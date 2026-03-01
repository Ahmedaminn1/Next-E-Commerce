import { ProductI } from '@/interfaces/product';

export interface CartItemI {
    count: number;
    _id: string;
    product: ProductI
    price: number;
}

export interface CartDataI {
    totalCartPrice: number;
    products: CartItemI[];
    _id: string;
}
