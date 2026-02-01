import {type PaginationProps} from "./type/Pagination";

export const Pagination = ({handelPageChange, totalPages, currentPage}: PaginationProps) => {

    return (
        <div className="pagination">
            <button
                disabled={currentPage === 1}
                onClick={() => handelPageChange(currentPage - 1)}
            >
                ←
            </button>

            <span>Page {currentPage} of {totalPages}</span>

            <button
                disabled={currentPage === totalPages}
                onClick={() => handelPageChange(currentPage + 1)}
            >
                →
            </button>
        </div>
    );
};