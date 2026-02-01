import {useEffect, useState} from 'react';
import {axiosInstance} from "../../../../shared/api/axiosInstance";
import {
    type CartProductWithDetails,
    type CartResponse,
    type CartWithProducts,
    type Product
} from "./type/CartWithProducts";


export const useCartWithProducts = (cartId: number = 1) => {
    const [state, setState] = useState<CartWithProducts>({
        cart: null,
        products: [],
        totalCartItems: 0,
        totalPrice: 0,
        isLoading: true,
        error: null
    });

    useEffect(() => {
        const fetchCartWithProducts = async () => {
            try {
                setState(prev => ({...prev, isLoading: true, error: null}));

                const cartResponse = await axiosInstance.get<CartResponse>(`/carts/${cartId}`);
                const cart = cartResponse.data;

                const productsWithDetails: CartProductWithDetails[] = [];

                for (const cartProduct of cart.products) {
                    try {
                        const productResponse = await axiosInstance.get<Product>(`/products/${cartProduct.productId}`);
                        productsWithDetails.push({
                            ...cartProduct,
                            productDetails: productResponse.data
                        });
                    } catch (error) {
                        console.error(`Error fetching product ${cartProduct.productId}:`, error);
                    }
                }

                const totalCartItems = productsWithDetails.reduce((sum, item) => sum + item.quantity, 0);
                const totalPrice = productsWithDetails.reduce((sum, item) => {
                    if (item.productDetails) {
                        return sum + (item.productDetails.price * item.quantity);
                    }
                    return sum;
                }, 0);

                setState({
                    cart,
                    products: productsWithDetails,
                    totalCartItems,
                    totalPrice,
                    isLoading: false,
                    error: null
                });

            } catch (error) {
                console.error('Error fetching cart:', error);
                setState(prev => ({
                    ...prev,
                    isLoading: false,
                    error: 'Failed to load cart'
                }));
            }
        };

        fetchCartWithProducts();
    }, [cartId]);

    return state;
};