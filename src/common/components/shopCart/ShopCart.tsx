import {useState} from 'react';
import styles from './shopCart.module.css';
import { CartItemsData} from "../shopCartItem/data/ShopCartItem";
import {type CartItem} from "../shopCartItem/type/ShopCartItem";
import {ShopCartItem} from "../shopCartItem/ShopCartItem";


export const ShopCart = () => {
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

    return (
        <div className={styles.cartContainer}>
            <div className={styles.header}>
                 <button>Back</button>
            <h2 className={styles.cartTitle}>🛒 Shopping Cart</h2>
            </div>


            {cartItems.length === 0 ? (
                <p className={styles.emptyCart}>Your cart is empty</p>
            ) : (
                <>
                    <div>
                        <ShopCartItem
                            cartItem={cartItems}
                            decreaseQuantity={decreaseQuantity}
                            removeItem={removeItem}
                            increaseQuantity={increaseQuantity}
                        />
                    </div>

                    <div className={styles.cartSummary}>
                        <div className={styles.summaryRow}>
                            <span>Total:</span>
                            <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
                        </div>
                        <button className={styles.checkoutBtn}>
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};