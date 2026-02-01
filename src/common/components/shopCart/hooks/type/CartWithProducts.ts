type CartProduct = {
    productId: number;
    quantity: number;
}

export type CartResponse = {
    id: number;
    userId: number;
    date: string;
    products: CartProduct[];
    __v: number;
}

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export type CartProductWithDetails = CartProduct & {
    productDetails: Product | null;
}

export type CartWithProducts =  {
    cart: CartResponse | null;
    products: CartProductWithDetails[];
    totalCartItems: number;
    totalPrice: number;
    isLoading: boolean;
    error: string | null;
}