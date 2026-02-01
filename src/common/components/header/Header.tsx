import styles from './header.module.css'
import {ThemeToggle} from "../../../features/themeToggle/ThemeToggle";
import {Input} from "../../../shared/components/ui/input/Input";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {useDebounce} from "./hooks/useDebounce";
import {useProductsStore} from "../product/stote/useProductsStore";
import {useCartStore} from "../shopCart/store/useShopCartStore";
import {useCartWithProducts} from "../shopCart/hooks/useCartWithProducts";


export const Header = () => {
    const navigate = useNavigate()
    const [searchProduct, setSearchProduct] = useState('');
    const debouncedSearchItem = useDebounce(searchProduct, 500);
    const {setSearchItem} = useProductsStore();
    const {fetchCart, totalItems} = useCartStore();
    const { totalCartItems } = useCartWithProducts();

    useEffect(() => {
        setSearchItem(debouncedSearchItem);
    }, [debouncedSearchItem, setSearchItem]);
    useEffect(() => {
        fetchCart();
    }, []);


    const handleShopCart = () => {
        navigate('/cart', {replace: true})
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchProduct(e.target.value);
    };

    const commonCount = totalCartItems + totalItems

    return (
        <header className={styles.header}>
            <div className={styles.title}>Catalog of products</div>

            <div>
                <Input
                    value={searchProduct}
                    onChange={handleSearchChange}
                    placeholder="Search products..."
                />
            </div>

            <ThemeToggle />
            <div className={styles.cart}>
                <button onClick={handleShopCart} className={styles.cartButton}>
                    <span className={styles.cartIcon}>🛒</span>
                    {totalCartItems > 0 && (
                        <span className={styles.cartCount}>{commonCount}</span>
                    )}
                </button>
            </div>
        </header>
    );
};
