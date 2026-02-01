import { useState, useEffect } from 'react';
import {type CartProductWithDetails} from "../../shopCart/type/ShopCart";

export const useCartQuantity = (initialProducts: CartProductWithDetails[]) => {
    const [localProducts, setLocalProducts] = useState<CartProductWithDetails[]>(initialProducts);

    useEffect(() => {
        setLocalProducts(initialProducts);
    }, [initialProducts]);

    const handleIncreaseQuantity = (index: number) => {
        setLocalProducts(prev => {
            const newProducts = [...prev];
            if (newProducts[index].productDetails) {
                const maxQuantity = newProducts[index].productDetails?.rating.count || 99;
                if (newProducts[index].quantity < maxQuantity) {
                    newProducts[index] = {
                        ...newProducts[index],
                        quantity: newProducts[index].quantity + 1
                    };
                }
            } else {
                newProducts[index] = {
                    ...newProducts[index],
                    quantity: newProducts[index].quantity + 1
                };
            }
            return newProducts;
        });
    };

    const handleDecreaseQuantity = (index: number) => {
        setLocalProducts(prev => {
            const newProducts = [...prev];
            if (newProducts[index].quantity > 1) {
                newProducts[index] = {
                    ...newProducts[index],
                    quantity: newProducts[index].quantity - 1
                };
            }
            return newProducts;
        });
    };

    const handleRemoveItem = (index: number) => {
        setLocalProducts(prev => prev.filter((_, i) => i !== index));
    };

    const handleUpdateQuantity = (index: number, value: string) => {
        const numValue = parseInt(value);
        if (!isNaN(numValue) && numValue > 0) {
            setLocalProducts(prev => {
                const newProducts = [...prev];
                if (newProducts[index].productDetails) {
                    const maxQuantity = newProducts[index].productDetails?.rating.count || 99;
                    newProducts[index] = {
                        ...newProducts[index],
                        quantity: Math.min(numValue, maxQuantity)
                    };
                } else {
                    newProducts[index] = {
                        ...newProducts[index],
                        quantity: numValue
                    };
                }
                return newProducts;
            });
        }
    };

      const totalItems = localProducts.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = localProducts.reduce((total, item) => {
        if (item.productDetails) {
            return total + (item.productDetails.price * item.quantity);
        }
        return total;
    }, 0);

    return {
        localProducts,
        totalItems,
        totalPrice,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleRemoveItem,
        handleUpdateQuantity
    };
};