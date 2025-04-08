import { LangType } from 'src/common/dto/query/langQuery.dto';
import { MangaListItemDto } from '../../dto/mangaListItem/mangaListItem.dto';
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
            chapterCount: mangaData.mangaStatistic?.chapterCount || 0,
            rate: mangaData.rate,
            type: mangaData.type,
            cover: '',
            bookmark: mangaData.bookmarks[0]?.bookmark || null,
        };
        if (mangaData.title) manga.title = mangaData.title[lang] || mangaData.title.ru;
        if (mangaData.mangaCovers.length) manga.cover = mangaData.mangaCovers[0].cover;
        return manga;
    });
}
