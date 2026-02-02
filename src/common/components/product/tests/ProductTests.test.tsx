import { render, screen } from '@testing-library/react';
import { Product } from '../Product';
import { vi } from 'vitest';
import {useProductsStore} from "../stote/useProductsStore";

vi.mock('../stote/useProductsStore');

const mockProducts = [
    {
        id: 1,
        title: 'Test Product 1',
        price: 100,
        description: 'Test Description 1',
        image: 'test1.jpg',
        rating: { count: 10 }
    },
    {
        id: 2,
        title: 'Test Product 2',
        price: 200,
        description: 'Test Description 2',
        image: 'test2.jpg',
        rating: { count: 5 }
    }
];

describe('Product Component', () => {
    const defaultProps = {
        currentPage: 1,
        productsPerPage: 12,
        filteredProducts: mockProducts,
        searchItem: ''
    };

    const mockUseProductsStore = vi.fn();

    beforeEach(() => {
        mockUseProductsStore.mockClear();

        vi.mocked(useProductsStore).mockImplementation(() => ({
            fetchProducts: vi.fn(),
            isLoading: false,
            selectedCategory: '',
            products: [],
            searchItem: '',
            setSearchItem: vi.fn(),
            setCategory: vi.fn(),
            fetchProductsByCategory: vi.fn(),
            setSortByPrice: vi.fn(),
            getSortedProducts: vi.fn()
        }));
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('1. Should show loader when isLoading is true', () => {
        vi.mocked(useProductsStore).mockReturnValue({
            fetchProducts: vi.fn(),
            isLoading: true,
            selectedCategory: '',
            products: [],
            searchItem: '',
            setSearchItem: vi.fn(),
            setCategory: vi.fn(),
            fetchProductsByCategory: vi.fn(),
            setSortByPrice: vi.fn(),
            getSortedProducts: vi.fn()
        })

        const { container } = render(<Product {...defaultProps} />)

        expect(screen.queryByText('Test Product 1')).toBeNull()
        expect(screen.queryByText('Add to cart')).toBeNull()

        const loaderDiv = container.querySelector('div[class*="loader"]')
        expect(loaderDiv).not.toBeNull()

        const loaderContainer = container.querySelector('div > div')
        expect(loaderContainer).not.toBeNull()
    })

    test('2. Should render products when not loading', () => {
        vi.mocked(useProductsStore).mockReturnValue({
            fetchProducts: vi.fn(),
            isLoading: false,
            selectedCategory: '',
            products: [],
            searchItem: '',
            setSearchItem: vi.fn(),
            setCategory: vi.fn(),
            fetchProductsByCategory: vi.fn(),
            setSortByPrice: vi.fn(),
            getSortedProducts: vi.fn()
        })

        render(<Product {...defaultProps} />)

        screen.getByText('Test Product 1')
        screen.getByText('Test Product 2')

        screen.getByText('Price: 100 $')
        screen.getByText('Price: 200 $')

        const addButtons = screen.getAllByText('Add to cart')
        expect(addButtons).toHaveLength(2)
    })

    test('3. Should show "no products found" message when search has no results', () => {
        vi.mocked(useProductsStore).mockReturnValue({
            fetchProducts: vi.fn(),
            isLoading: false,
            selectedCategory: '',
            products: [],
            searchItem: '',
            setSearchItem: vi.fn(),
            setCategory: vi.fn(),
            fetchProductsByCategory: vi.fn(),
            setSortByPrice: vi.fn(),
            getSortedProducts: vi.fn()
        })

        render(
            <Product
                currentPage={1}
                productsPerPage={12}
                filteredProducts={[]}
                searchItem="nonexistent"
            />
        )

        screen.getByText(/No products found for "nonexistent"/i)
        screen.getByText(/Try adjusting your search or filter/i)

        expect(screen.queryByText('Test Product 1')).toBeNull()
        expect(screen.queryByText('Add to cart')).toBeNull()
    })

    test('4. Should show category message when selected category has no products', () => {
        vi.mocked(useProductsStore).mockReturnValue({
            fetchProducts: vi.fn(),
            isLoading: false,
            selectedCategory: 'electronics',
            products: [],
            searchItem: '',
            setSearchItem: vi.fn(),
            setCategory: vi.fn(),
            fetchProductsByCategory: vi.fn(),
            setSortByPrice: vi.fn(),
            getSortedProducts: vi.fn()
        })

        const { container } = render(
            <Product
                currentPage={1}
                productsPerPage={12}
                filteredProducts={[]}
                searchItem=""
            />
        );

        const categoryMessage = screen.getByText(/No products found in "electronics" category/i)
        const suggestionMessage = screen.getByText(/Try selecting a different category/i)

        expect(categoryMessage).toBeTruthy()
        expect(suggestionMessage).toBeTruthy()

        expect(screen.queryByText('Test Product 1')).toBeNull()
    })

    test('5. Should display correct number of products based on pagination', () => {
        vi.mocked(useProductsStore).mockReturnValue({
            fetchProducts: vi.fn(),
            isLoading: false,
            selectedCategory: '',
            products: [],
            searchItem: '',
            setSearchItem: vi.fn(),
            setCategory: vi.fn(),
            fetchProductsByCategory: vi.fn(),
            setSortByPrice: vi.fn(),
            getSortedProducts: vi.fn()
        })

        const moreProducts = [
            ...mockProducts,
            {
                id: 3,
                title: 'Test Product 3',
                price: 300,
                description: 'Test Description 3',
                image: 'test3.jpg',
                rating: { count: 8 }
            },
            {
                id: 4,
                title: 'Test Product 4',
                price: 400,
                description: 'Test Description 4',
                image: 'test4.jpg',
                rating: { count: 12 }
            }
        ]

        render(
            <Product
                currentPage={1}
                productsPerPage={2}
                filteredProducts={moreProducts}
                searchItem=""
            />
        )

        screen.getByText('Test Product 1')
        screen.getByText('Test Product 2')

        expect(screen.queryByText('Test Product 3')).toBeNull()
        expect(screen.queryByText('Test Product 4')).toBeNull()

        const addButtons = screen.getAllByText('Add to cart')
        expect(addButtons.length).toBe(2)
    })
});