import {type Product} from "../../../common/components/product/type/product";

export const filterProductsBySearch = (
    products: Product[],
    searchTerm: string
): Product[] => {
    if (!searchTerm.trim()) {
        return products;
    }

    const term = searchTerm.toLowerCase();
    return products.filter((product) =>
        product.title.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );
};