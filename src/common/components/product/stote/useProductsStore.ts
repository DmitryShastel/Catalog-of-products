import {create} from "zustand/react";
import {type Product} from "../type/product";
import {axiosInstance} from "../../../../shared/api/axiosInstance";

type ProductsStore = {
    products: Product[]
    fetchProducts: () => Promise<void>
}

export const useProductsStore = create<ProductsStore>((set) => ({
    products: [],

    fetchProducts: async () => {
        try{
            const response = await axiosInstance.get<Product[]>('/products')

            set({products: response.data})
        }catch (error){}
    }
}))