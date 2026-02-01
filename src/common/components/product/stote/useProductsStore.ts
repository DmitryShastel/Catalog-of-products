import {create} from "zustand/react";
import {type Product} from "../type/product";
import {axiosInstance} from "../../../../shared/api/axiosInstance";

type ProductsStore = {
    products: Product[]
    isLoading: boolean
    searchItem: string;
    fetchProducts: () => Promise<void>
    setSearchTerm: (searchItem: string) => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
    products: [],
    isLoading: false,
    searchItem: '',

    fetchProducts: async () => {

        set({ isLoading: true })

        try{
            const response = await axiosInstance.get<Product[]>('/products')

            set({products: response.data, isLoading: false,})
        }catch (error){
            set({isLoading: false});
            console.error("Error fetching products:", error)
        }
    },

    setSearchItem: (Item: string) => {
        set({ searchItem: Item })
    }
}))