export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export type CartItemProps = {
    cartItem: CartItem[]
    decreaseQuantity: (id: number) => void
    increaseQuantity: (id: number) => void
    removeItem: (id: number) => void
}