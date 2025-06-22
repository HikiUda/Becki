import { LangType } from 'src/shared/dto/query/langQuery.dto';
import type { CatalogMangaDB } from '../getCatalogManga';
import { CatalogMangaDto } from '../../dto/catalogManga.dto';

export function toCatalogBookDto<T extends CatalogMangaDB>(
    data: T,
    lang: LangType,
): CatalogMangaDto[] {
    return data.map((mangaData) => {
        const manga: CatalogMangaDto = {
            id: mangaData.id,
            urlId: mangaData.urlId,
            title: '',
            chapterCount: mangaData.statistic?.chapterCount || 0,
            rate: mangaData.statistic?.rate || 0,
            type: mangaData.type,
            cover: '',
            bookmark: (mangaData.bookmarks && mangaData.bookmarks[0]?.bookmark) || null,
        };
        if (mangaData.title) manga.title = mangaData.title[lang] || mangaData.title.ru;
        if (mangaData.covers.length) manga.cover = mangaData.covers[0].cover;
        return manga;
    });
}
