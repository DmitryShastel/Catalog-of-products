import {Product} from "../product/Product";
import {FilterByCategory} from "../../../features/filterByCategory/FilterByCategory";
import {FilterByPrice} from "../../../features/filterByPrice/FilterByPrice";
import styles from "./main.module.css";
import {Pagination} from "../../../features/pagination/Pagination";
import {categories} from "../../../shared/data/productCategories/ProductCategories";
import {useState} from "react";
import {useProductsStore} from "../product/stote/useProductsStore";
import {useSearchProducts} from "../header/hooks/useSearchProducts";


export const Main = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const {searchItem, getSortedProducts} = useProductsStore()
    const productsPerPage = 12
    const sortedProducts = getSortedProducts()
    const filteredProducts = useSearchProducts(sortedProducts, searchItem)


    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    const handelPageChange = (nextPage: number) => {
        setCurrentPage(nextPage)
    }

    return (
        <div>
            <div className={styles.filters}>
                <FilterByCategory categories={categories}/>
                <FilterByPrice/>
            </div>
            <Product
                currentPage={currentPage}
                productsPerPage={productsPerPage}
                filteredProducts={filteredProducts}
                searchItem={searchItem}
            />
            {filteredProducts.length > productsPerPage && (
                <div className={styles.pagination}>
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handelPageChange={handelPageChange}
                    />
                </div>
            )}
        </div>
    );
};
