export class Pagination {
    currentPage: number = 1;
    itemsPerPage: number = 10;
    totalItems: number;
    pages: number[];
}

export class PaginatedResult<T> {
    result: T;
    totalItems: number;
}