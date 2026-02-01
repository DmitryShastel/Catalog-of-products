import {create} from "zustand/react";
import {type Product} from "../type/product";
import {axiosInstance} from "../../../../shared/api/axiosInstance";

type SortDirection = 'asc' | 'desc' | null

type ProductsStore = {
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

export const useProductsStore = create<ProductsStore>((set, get) => ({
    products: [],
    isLoading: false,
    searchItem: '',
    selectedCategory: '',
    sortByPrice: null,

    fetchProducts: async () => {
        set({isLoading: true})
        try {
            const response = await axiosInstance.get<Product[]>('/products')
            set({
                products: response.data,
                isLoading: false,
                selectedCategory: '',
                sortByPrice: null
            })
        } catch (error) {
            set({isLoading: false});
            console.error("Error fetching products:", error)
        }
    },

    fetchProductsByCategory: async (category: string) => {
        set({isLoading: true})
        try {
            const response = await axiosInstance.get<Product[]>(`/products/category/${category}`)
            set({
                products: response.data,
                isLoading: false,
                selectedCategory: category,
                sortByPrice: null
            })
        } catch (error) {
            set({isLoading: false});
            console.error(`Error fetching products for category ${category}:`, error)
        }
    },

    setCategory: async (category: string) => {
        if (category === get().selectedCategory) {
            await get().fetchProducts()
        } else if (category) {
            await get().fetchProductsByCategory(category)
        }
    },

    setSearchItem: (Item: string) => {
        set({searchItem: Item})
    },

    setSortByPrice: (direction: SortDirection) => {
        set({sortByPrice: direction})
    },

    getSortedProducts: () => {
        const {products, sortByPrice} = get();

        if (!sortByPrice) {
            return products;
        }

        const sortedProducts = [...products];

        if (sortByPrice === 'asc') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortByPrice === 'desc') {
            sortedProducts.sort((a, b) => b.price - a.price);
        }

        return sortedProducts;
    }
}))