import { create } from 'zustand';
import {axiosInstance} from "../../../../shared/api/axiosInstance";
import {persist} from "zustand/middleware";
import {type CartResponse, type CartStore} from "./type/CartStore";


export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: null,
            isLoading: false,
            totalItems: 0,

            fetchCart: async () => {
                set({ isLoading: true });
                try {
                    const response = await axiosInstance.get<CartResponse>('/carts/1');
                    set({
                        cart: response.data,
                        isLoading: false
                    });
                } catch (error) {
                    set({ isLoading: false });
                    console.error('Error fetching cart:', error);
                }
            },

            getTotalItems: () => {
                const cart = get().cart;
                if (!cart || !cart.products) return 0;
                return cart.products.reduce((total, product) => total + product.quantity, 0);
            },

            increaseTotalItems: (count: number) => {
                set((state) => ({
                    totalItems: state.totalItems + count
                }));
            }
        }),
        {
            name: 'cart-storage',

        }
    )
);