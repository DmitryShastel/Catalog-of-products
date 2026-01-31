import {type CartItemProps} from "./type/ShopCartItem";
import styles from "./shopCartItem.module.css"


export const ShopCartItem = ({cartItem, removeItem, increaseQuantity, decreaseQuantity}: CartItemProps) => {

    return (
        <div>
            {cartItem?.map(item => (
                <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemInfo}>
                        {item.image && (
                            <img
                                src={item.image}
                                alt={item.name}
                                className={styles.itemImage}
                            />
                        )}
                        <div className={styles.itemDetails}>
                            <h3 className={styles.itemName}>{item.name}</h3>
                            <p className={styles.itemPrice}>${item.price}</p>
                        </div>
                    </div>

                    <div className={styles.itemActions}>
                        <div className={styles.quantityControl}>
                            <button
                                className={styles.quantityBtn}
                                onClick={() => decreaseQuantity(item.id)}
                            >
                                -
                            </button>
                            <span className={styles.quantity}>{item.quantity}</span>
                            <button
                                className={styles.quantityBtn}
                                onClick={() => increaseQuantity(item.id)}
                            >
                                +
                            </button>
                        </div>

                        <div className={styles.itemTotal}>
                            ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        <button
                            className={styles.removeBtn}
                            onClick={() => removeItem(item.id)}
                        >
                            ×
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
