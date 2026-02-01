import styles from "../product/product.module.css";
import {useProductsStore} from "./stote/useProductsStore";
import {useEffect} from "react";
import {Loader} from "../../../shared/components/ui/loader/Loader";
import {type ProductPagination} from "./type/product";


export const Product = ({
                            currentPage,
                            productsPerPage= 12,
                            filteredProducts,
                            searchItem
}: ProductPagination) => {

    const {fetchProducts, isLoading} = useProductsStore()

    useEffect(() => {
        fetchProducts().catch(error => {
            console.error("Failed to fetch products:", error)
        })
    }, [])

    if (isLoading) {
        return <Loader />;
    }

    if (searchItem && filteredProducts.length === 0) {
        return (
            <div className={styles.noProducts}>
                <h3>No products found for "{searchItem}"</h3>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
            </div>
        );
    }

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className={styles.content}>
            {currentProducts.map(product => (
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
