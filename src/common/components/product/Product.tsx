import styles from "../product/product.module.css";
import {useProductsStore} from "./stote/useProductsStore";
import {useEffect, useState} from "react";
import {Loader} from "../../../shared/components/ui/loader/Loader";
import {type ProductPagination} from "./type/product";
import {CountOfProduct} from "../../../features/countOfProduct/CountOfProduct";


export const Product = ({
                            currentPage,
                            productsPerPage= 12,
                            filteredProducts,
                            searchItem,
}: ProductPagination ) => {
   const [add, setAdd] = useState<Record<number, boolean>>({})
    const {fetchProducts, isLoading, selectedCategory} = useProductsStore()

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

    if (selectedCategory && filteredProducts.length === 0) {
        return (
            <div className={styles.noProducts}>
                <h3>No products found in "{selectedCategory}" category</h3>
                <p>Try selecting a different category.</p>
            </div>
        );
    }

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlerCountOfProduct = (productId: number) => {
        setAdd(prev => ({
            ...prev,
            [productId]: true
        }));
    }

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
                    {add[product.id]
                        ?<CountOfProduct
                            productId={product.id}
                            productTitle={product.title}
                        />
                        : <button onClick={() => handlerCountOfProduct(product.id)}>Add to cart</button>}
                    <p className={styles.productCount}>In stock {product.rating.count} </p>
                </div>
            ))}
        </div>
    );
};
