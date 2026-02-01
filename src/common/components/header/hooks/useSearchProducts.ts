import {useMemo} from 'react';
import {type Product} from "../../product/type/product";
import {filterProductsBySearch} from "../../../../shared/utils/filterProductsBySearch/FilterProductBySearch";


export const useSearchProducts = (products: Product[], searchTerm: string): Product[] => {
    return useMemo(() => {
        return filterProductsBySearch(products, searchTerm);
    }, [products, searchTerm]);
};