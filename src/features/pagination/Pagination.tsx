import { useState } from 'react';

export const Pagination = () => {
    const [page, setPage] = useState<number>(1);
    const totalPages = 10;

    return (
        <div className="pagination">
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                ←
            </button>

            <span>Page {page} of {totalPages}</span>

            <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
            >
                →
            </button>
        </div>
    );
};