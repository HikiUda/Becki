import { BadRequestException, Injectable } from '@nestjs/common';
import { EditChapterPagesRepositoryInterface } from './interfaces/editChapterPagesRepository';
import { LangType } from 'src/common/dto/query/langQuery.dto';
import { ChapterPagesDto } from './dto/chapterPages.scheme';
import { getChapterPages } from './prisma/getChapterPages';
import { setChapterPages } from './prisma/setChapterPages';
import { addLangChapterPages } from './prisma/addLangChapterPages';
import { deleteLangChapterPages } from './prisma/deleteLangChapterPages';
import { AllLangPagesType } from './dto/allLangPages';
import { getAllLangPages } from './prisma/getAllLangPages';

@Injectable()
export class EditChapterPagesRepository implements EditChapterPagesRepositoryInterface {
    constructor() {}
    async getChapterPages(chapterId: number, lang: LangType): Promise<ChapterPagesDto | null> {
        return await getChapterPages(chapterId, lang);
    }
    async setChapterPages(
        chapterId: number,
        pages: ChapterPagesDto,
        lang: LangType,
    ): Promise<ChapterPagesDto> {
        return await setChapterPages(chapterId, pages, lang);
    }
    async addLangChapterPages(chapterId: number, lang: LangType): Promise<ChapterPagesDto> {
        return await addLangChapterPages(chapterId, lang);
    }
    async deleteLangChapterPages(chapterId: number, lang: LangType): Promise<void> {
        if (lang === 'ru') throw new BadRequestException('Эту локаль нельзя удалить');
        await deleteLangChapterPages(chapterId, lang);
    }

    async getAllLangPages(chapterId: number): Promise<AllLangPagesType> {
        return await getAllLangPages(chapterId);
    }
}
