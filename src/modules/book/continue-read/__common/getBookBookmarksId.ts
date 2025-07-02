export function getBookBookmarksId(userId: number, bookId: number) {
    return `${userId}-${bookId}`;
}
