export type CartProduct = {
    productId: number;
    quantity: number;
};

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
};

export type CartProductWithDetails = CartProduct & {
    productDetails: Product | null;
};