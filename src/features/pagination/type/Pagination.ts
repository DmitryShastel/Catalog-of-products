export type PaginationProps = {
    currentPage: number
    totalPages: number
    handelPageChange: (page: number) => void
}