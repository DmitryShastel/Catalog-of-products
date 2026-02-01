import styles from './FilterByPrice.module.css';
import {useProductsStore} from "../../common/components/product/stote/useProductsStore";

export const FilterByPrice = () => {
    const { sortByPrice, setSortByPrice } = useProductsStore();

    const handleSortClick = () => {
        if (sortByPrice === null) {
            setSortByPrice('asc');
        } else if (sortByPrice === 'asc') {
            setSortByPrice('desc');
        } else {
            setSortByPrice(null);
        }
    };

    const getArrow = () => {
        if (sortByPrice === null) return '↑↓';
        if (sortByPrice === 'asc') return '↑';
        return '↓';
    };

    return (
        <div className={styles.container}>
            <h4 className={styles.priceTitle}>Filter by price:</h4>
            <button
                className={`${styles.sortButton} ${
                    sortByPrice ? styles.active : ''
                }`}
                onClick={handleSortClick}
            >
                <span className={styles.arrow}>
                    {getArrow()}
                </span>
            </button>
        </div>
    );
};