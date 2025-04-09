export function getUserMangaBookmarkId(mangaId: number, userId: number) {
    return `${mangaId}-${userId}`;
}
