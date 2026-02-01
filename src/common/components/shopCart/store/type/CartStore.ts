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

export type CartStore = {
    cart: CartResponse | null;
    isLoading: boolean;
    fetchCart: () => Promise<void>;
    getTotalItems: () => number;
    totalItems: number;
}