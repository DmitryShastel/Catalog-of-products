import {create} from "zustand/react";
import {type Product} from "../type/product";
import {axiosInstance} from "../../../../shared/api/axiosInstance";

type ProductsStore = {
    products: Product[]
    isLoading: boolean
    fetchProducts: () => Promise<void>
}

export const useProductsStore = create<ProductsStore>((set) => ({
    products: [],
    isLoading: false,

    fetchProducts: async () => {

        set({ isLoading: true })

        try{
            const response = await axiosInstance.get<Product[]>('/products')

            set({products: response.data, isLoading: false,})
        }catch (error){
            set({isLoading: false});
            console.error("Error fetching products:", error)
        }
    }
}))