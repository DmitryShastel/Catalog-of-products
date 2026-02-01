import {useState} from 'react';
import styles from './countOfProduct.module.css';
import {toast} from "react-toastify";
import {useCartStore} from "../../common/components/shopCart/store/useShopCartStore";
import {type CountOfProductProps} from "./type/CountOfProductProps";


export const CountOfProduct = ({
                                   onCountChange,
                                   productId,
                                   productTitle,
                               }: CountOfProductProps) => {
    const [count, setCount] = useState<number>(1);
    const { increaseTotalItems } = useCartStore();

    const handleAddToCart = () => {
        increaseTotalItems(count)
        toast.success(`${count}:  ${productTitle} added to cart!`, {
            position: "top-right",
            autoClose: 3000,
        });
    };

    const handleDecrement = () => {
        if (count > 1) {
            const newCount = count - 1;
            setCount(newCount);
            onCountChange?.(newCount);
        }
    };
    const handleIncrement = () => {
        const newCount = count + 1;
        setCount(newCount);
        onCountChange?.(newCount);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1) {
            setCount(value);
            onCountChange?.(value);
        } else if (e.target.value === '') {
            setCount(0);
            onCountChange?.(0);
        }
    };
    const handleBlur = () => {
        if (count < 1) {
            setCount(1);
            onCountChange?.(1);
        }
    };

    return (
        <div className={styles.container} data-product-id={productId}>
            <button
                className={styles.button}
                onClick={handleDecrement}
                disabled={count <= 1}
            >
                -
            </button>
            <input
                type="text"
                className={styles.input}
                value={count}
                onChange={handleInputChange}
                onBlur={handleBlur}
            />
            <button
                className={styles.button}
                onClick={handleIncrement}
            >
                +
            </button>
            <button
                className={styles.addButton}
                onClick={handleAddToCart}
            >
                Add
            </button>
        </div>
    );
};