import {type Product} from "../../type/product";

export type SortDirection = 'asc' | 'desc' | null

export type ProductsStore = {
    products: Product[]
    isLoading: boolean
    searchItem: string;
    selectedCategory: string;
    sortByPrice: SortDirection;
    fetchProducts: () => Promise<void>
    setSearchTerm: (searchItem: string) => void;
    fetchProductsByCategory: (category: string) => Promise<void>
    setCategory: (category: string) => void
    getSortedProducts: () => Product[]
    setSortByPrice: (direction: SortDirection) => void
}