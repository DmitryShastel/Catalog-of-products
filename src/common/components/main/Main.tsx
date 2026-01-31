import {Header} from "../header/Header";
import {Product} from "../product/Product";
import { FilterByCategory} from "../../../features/filterByCategory/FilterByCategory";
import {type Categories} from "../../../features/filterByCategory/type/FilterByCategory";


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
            <>
                <FilterByCategory categories={categories}/>
                <Product/>
            </>
            <div>pagination</div>
        </div>
    );
};
