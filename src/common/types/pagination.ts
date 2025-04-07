export interface ResponseArrayData<T> {
    data: T[];
}

export interface Pagination<T> extends ResponseArrayData<T> {
    prevPage: number | null;
    nextPage: number | null;
}
