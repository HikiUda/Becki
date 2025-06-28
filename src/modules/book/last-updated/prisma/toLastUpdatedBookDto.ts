import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { GetLastUpdatedMangaReturnType } from './getLastUpdatedManga';
import { LastUpdatedMangaDto } from '../dto/lastUpdatedManga.dto';

export function toLastUpdatedBookDto(
    data: GetLastUpdatedMangaReturnType,
    lang: LangType,
): LastUpdatedMangaDto[] {
    return data.map((chapter) => {
        const manga: LastUpdatedMangaDto = {
            id: chapter.book.id,
            urlId: chapter.book.urlId,
            title: chapter.book.title?.[lang] || chapter.book.title?.ru || '',
            cover: chapter.book.covers[0]?.cover || '',
            type: chapter.book.type,
            tome: chapter.tome,
            chapter: chapter.chapter,
            chapterCreatedAt: chapter.createdAt,
            chapterId: chapter.id,
        };

        return manga;
    });
}
