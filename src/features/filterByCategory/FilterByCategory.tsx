import {useState} from "react";
import styles from './filterBycategory.module.css'
import {type FilterByCategoryProps} from './type/FilterByCategory'

export const FilterByCategory = ({categories}: FilterByCategoryProps) => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    return (
        <div className={styles.container}>
            <h4>Filter by category:</h4>

            <div className={styles.categoriesList}>
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className={`${styles.categoryButton} ${
                            activeCategory === category ? styles.active : ''
                        }`}
                        onClick={() => {
                            setActiveCategory(category);
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};
