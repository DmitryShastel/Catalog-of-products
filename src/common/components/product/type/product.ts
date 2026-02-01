type Rating = {
    rate: number
    count: number
}

export type Product  = {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: Rating
}

export type ProductPagination = {
    currentPage: number
    productsPerPage: number
    filteredProducts:Product[]
    searchItem: string
}