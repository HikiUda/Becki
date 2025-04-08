export function getPagination(count: number, page: number, limit: number) {
    return {
        prevPage: page - 1 > 0 ? page - 1 : null,
        nextPage: count - limit * page > 0 ? page + 1 : null,
    };
}
