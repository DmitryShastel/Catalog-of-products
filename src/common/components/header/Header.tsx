import styles from './header.module.css'
import {ThemeToggle} from "../../../features/themeToggle/ThemeToggle";
import {Input} from "../../../shared/components/ui/input/Input";
import {useNavigate} from "react-router";

export const Header = () => {

    const navigate = useNavigate()

    const handleShopCart = () => {
        navigate('/cart', {replace: true})
    }


    const cartItemsCount = 5;


    return (
        <header className={styles.header}>
            <div className={styles.title}>
                Catalog of products
            </div>
            <Input/>
            <ThemeToggle/>
            <div className={styles.cart}>
            <button onClick={handleShopCart} className={styles.cartButton}>
                <span className={styles.cartIcon}>🛒</span>
                {cartItemsCount > 0 && (
                    <span className={styles.cartCount}>{cartItemsCount}</span>
                )}
            </button>
        </div>
        </header>
    );
};
