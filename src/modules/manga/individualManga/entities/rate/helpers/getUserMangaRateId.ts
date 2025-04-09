export function getUserMangaRateId(mangaId: number, userId: number) {
    return `${mangaId}-${userId}`;
}
