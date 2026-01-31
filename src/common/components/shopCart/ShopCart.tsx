import styles from './shopCart.module.css';
import {ShopCartItem} from "../shopCartItem/ShopCartItem";
import {useCartItemActions} from "../shopCartItem/hooks/useCartItemActions";


export const ShopCart = () => {

    const {cartItems, removeItem, increaseQuantity, decreaseQuantity, totalPrice} = useCartItemActions()

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