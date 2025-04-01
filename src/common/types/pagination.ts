export interface Pagination<T> {
    data: T[];
    prevPage: number | null;
    nextPage: number | null;
}
