import {useState} from "react";
import {type CartItem} from "../type/ShopCartItem";
import {CartItemsData} from "../data/ShopCartItem";


export const useCartItemActions = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>(CartItemsData);

    const increaseQuantity = (id: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id ? {...item, quantity: item.quantity + 1} : item
            )
        );
    };

    const decreaseQuantity = (id: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id && item.quantity > 1
                    ? {...item, quantity: item.quantity - 1}
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        totalPrice
    }

}