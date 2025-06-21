import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { MangaListItemDto } from '../../../../dto/mangaListItem.dto';
import type { getMangaListReturnType } from './getMangaList';

export function toMangaListItemDto(
    data: getMangaListReturnType,
    lang: LangType,
): MangaListItemDto[] {
    return data.map((mangaData) => {
        const manga: MangaListItemDto = {
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
