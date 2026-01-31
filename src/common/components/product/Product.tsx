import styles from "../product/product.module.css";
import {useProductsStore} from "./stote/useProductsStore";
import {useEffect} from "react";


export const Product = () => {

    const {products, fetchProducts} = useProductsStore()

    useEffect(() => {
        fetchProducts().catch(error => {
            console.error("Failed to fetch products:", error)
        })
    }, [])

    return (
        <div className={styles.content}>
            {products.map(product => (
                <div key={product.id} className={styles.productCard}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className={styles.productImage}
                    />
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <p className={styles.productPrice}>Price: {product.price} $</p>
                    <p className={styles.productDescription}>{product.description} </p>
                    <button>Add to cart</button>
                    <p className={styles.productCount}>In stock {product.rating.count} </p>
                </div>
            ))}
        </div>
    );
};
