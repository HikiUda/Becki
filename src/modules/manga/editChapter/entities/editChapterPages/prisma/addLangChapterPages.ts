import { LangType } from 'src/common/dto/query/langQuery.dto';
import { ChapterPagesScheme, ChapterPagesDto } from '../dto/chapterPages.scheme';
import { prisma } from 'src/common/helpers/prisma';
import { Prisma } from '@prisma/client';

export const addLangChapterPages = async (chapterId: number, lang: LangType) => {
    const pages: ChapterPagesDto = { pageCount: 0, pages: [], containerMaxWidth: 700 };
    const data: Prisma.ChapterPagesUpdateInput = {};
    data[lang] = { ...pages };
    const addedPages = await prisma.chapterPages.update({
        where: { chapterId },
        data,
        select: { ru: lang === 'ru', en: lang === 'en' },
    });
    return ChapterPagesScheme.parse(addedPages[lang]);
};
