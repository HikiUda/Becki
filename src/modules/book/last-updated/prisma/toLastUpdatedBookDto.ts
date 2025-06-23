import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { GetLastUpdatedMangaReturnType } from './getLastUpdatedManga';
import { LastUpdatedMangaDto } from '../dto/lastUpdatedManga.dto';

export function toLastUpdatedBookDto(
    data: GetLastUpdatedMangaReturnType,
    lang: LangType,
): LastUpdatedMangaDto[] {
    return data.map((chapter) => {
        const manga: LastUpdatedMangaDto = {
            id: chapter.manga.id,
            urlId: chapter.manga.urlId,
            title: chapter.manga.title?.[lang] || chapter.manga.title?.ru || '',
            cover: chapter.manga.covers[0]?.cover || '',
            type: chapter.manga.type,
            tome: chapter.tome,
            chapter: chapter.chapter,
            chapterCreatedAt: chapter.createdAt,
            chapterId: chapter.id,
        };

        return manga;
    });
}
