import { useState } from 'react';
import styles from './FilterByPrice.module.css';

export const FilterByPrice = () => {
    const [isAscending, setIsAscending] = useState(true);

    return (
        <div className={styles.container}>
            <h4 className={styles.priceTitle}>Filter by price:</h4>
            <button
                className={styles.sortButton}
                onClick={() => setIsAscending(!isAscending)}
            >
                <span className={styles.arrow}>
                    {isAscending ? '↑' : '↓'}
                </span>
            </button>
        </div>
    );
};