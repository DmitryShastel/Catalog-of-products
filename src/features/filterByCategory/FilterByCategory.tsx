import styles from './filterBycategory.module.css'
import {type FilterByCategoryProps} from './type/FilterByCategory'
import {useProductsStore} from "../../common/components/product/stote/useProductsStore";

export const FilterByCategory = ({categories, filterCategories}: FilterByCategoryProps) => {
    const {selectedCategory, setCategory} = useProductsStore()

    return (
        <div className={styles.container}>
            <h4>Filter by category:</h4>

            <div className={styles.categoriesList}>
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className={`${styles.categoryButton} ${
                            selectedCategory === category ? styles.active : ''
                        }`}
                        onClick={() => {
                            setCategory(category);
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};
