import { Injectable } from '@nestjs/common';
import { PublicChapterServiceInterface } from './interfaces/publicChapterService';
import { PublicChapterRepository } from './publicChapter.repository';
import { ChapterListPagination } from './dto/chapterList/chapterListItem.dto';
import { ChapterListQuery } from './dto/chapterList/chapterListQuery';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { ChapterDto } from './dto/chapter.dto';

@Injectable()
export class PublicChapterService implements PublicChapterServiceInterface {
    constructor(private publicChapterRepository: PublicChapterRepository) {}
    async getChapter(chapterId: number, lang: LangType, userId?: number): Promise<ChapterDto> {
        return await this.publicChapterRepository.getChapter(chapterId, lang, userId);
    }
    async getChapterList(
        mangaId: number,
        query: ChapterListQuery,
        userId?: number,
    ): Promise<ChapterListPagination> {
        return await this.publicChapterRepository.getChapterList(mangaId, query, userId);
    }
}
