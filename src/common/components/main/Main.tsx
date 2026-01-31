import {Header} from "../header/Header";
import {Product} from "../product/Product";
import { FilterByCategory} from "../../../features/filterByCategory/FilterByCategory";
import {type Categories} from "../../../features/filterByCategory/type/FilterByCategory";
import {FilterByPrice} from "../../../features/filterByPrice/FilterByPrice";
import styles from "./main.module.css";


export const Main = () => {

    const categories: Categories = [
        "electronics",
        "jewelery",
        "men's clothing",
        "women's clothing"
    ];

    return (
        <div>
            <Header/>
            <div className={styles.filters}>
                <FilterByCategory categories={categories}/>
                <FilterByPrice/>
            </div>
            <Product/>
            <div>pagination</div>
        </div>
    );
};
