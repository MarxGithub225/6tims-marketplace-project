export interface PaginationOption {
    page?: number
    limit?: number
    filter?: string
    fields?: string
    order?: string
    sort?: string
}

export interface Pagination<T> {
    totalDocs: number,
    limit: number,
    totalPages: number,
    page: number,
    pagingCounter: number,
    hasPrevPage: boolean,
    hasNextPage: boolean,
    prevPage: string | null,
    nextPage: string | null
    docs: Array<T>
}
