import styles from './shopCart.module.css';
import {useNavigate} from "react-router";
import {Loader} from "../../../shared/components/ui/loader/Loader";
import {useCartWithProducts} from "./hooks/useCartWithProducts";
import {useCartQuantity} from "../shopCartItem/hooks/useCartQuantity";


export const ShopCart = () => {
    const navigate = useNavigate()
    const {products, isLoading} = useCartWithProducts();

    const {
        localProducts,
        totalItems,
        totalPrice,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleRemoveItem,
        handleUpdateQuantity
    } = useCartQuantity(products);

    const handleCatalogBack = () => {
        navigate('/', {replace: true})
    }

    if (isLoading) {
        return <Loader />;
    }

    const displayProducts = localProducts.length > 0 ? localProducts : products;

    return (
        <div className={styles.cartContainer}>
            <div className={styles.header}>
                <button onClick={handleCatalogBack}>Back</button>
                <h2 className={styles.cartTitle}>🛒 Shopping Cart</h2>
            </div>

            {displayProducts.length === 0 ? (
                <p className={styles.emptyCart}>Your cart is empty</p>
            ) : (
                <>
                    <div className={styles.productsList}>
                        {displayProducts.map((item, index) => (
                            <div key={index} className={styles.productCard}>
                                {item.productDetails ? (
                                    <>
                                        <div className={styles.productImageContainer}>
                                            <img
                                                src={item.productDetails.image}
                                                alt={item.productDetails.title}
                                                className={styles.productImage}
                                            />
                                        </div>
                                        <div className={styles.productInfo}>
                                            <h3 className={styles.productTitle}>
                                                {item.productDetails.title}
                                            </h3>
                                            <p className={styles.productDescription}>
                                                {item.productDetails.description.substring(0, 100)}...
                                            </p>
                                            <div className={styles.productMeta}>
                                                <span className={styles.productPrice}>
                                                    ${item.productDetails.price.toFixed(2)}
                                                </span>
                                                <span className={styles.productCategory}>
                                                    {item.productDetails.category}
                                                </span>
                                                <div className={styles.productRating}>
                                                    ⭐ {item.productDetails.rating.rate}
                                                    ({item.productDetails.rating.count})
                                                </div>
                                            </div>
                                            <div className={styles.quantityContainer}>
                                                <div className={styles.quantityControls}>
                                                    <button
                                                        className={styles.quantityButton}
                                                        onClick={() => handleDecreaseQuantity(index)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className={styles.quantityInput}
                                                        value={item.quantity}
                                                        onChange={(e) => handleUpdateQuantity(index, e.target.value)}
                                                    />
                                                    <button
                                                        className={styles.quantityButton}
                                                        onClick={() => handleIncreaseQuantity(index)}
                                                        disabled={item.productDetails && item.quantity >= item.productDetails.rating.count}
                                                    >
                                                        +
                                                    </button>
                                                    <button
                                                        className={styles.removeButton}
                                                        onClick={() => handleRemoveItem(index)}
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                                <div className={styles.itemTotal}>
                                                    Item total:
                                                    <span className={styles.itemTotalPrice}>
                                                        ${(item.productDetails.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className={styles.productInfo}>
                                        <h3>Product ID: {item.productId}</h3>
                                        <p>Failed to load product details</p>
                                        <div className={styles.quantityControls}>
                                            <button
                                                className={styles.quantityButton}
                                                onClick={() => handleDecreaseQuantity(index)}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                className={styles.quantityInput}
                                                value={item.quantity}
                                                onChange={(e) => handleUpdateQuantity(index, e.target.value)}
                                            />
                                            <button
                                                className={styles.quantityButton}
                                                onClick={() => handleIncreaseQuantity(index)}
                                            >
                                                +
                                            </button>
                                            <button
                                                className={styles.removeButton}
                                                onClick={() => handleRemoveItem(index)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className={styles.cartSummary}>
                        <div className={styles.summaryRow}>
                            <span>Total items:</span>
                            <span className={styles.totalItems}>{totalItems}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Total price:</span>
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