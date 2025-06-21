import { prisma } from 'src/shared/prisma/prisma';
import { ChapterPagesScheme, ChapterPagesDto } from '../dto/chapterPages.scheme';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { Prisma } from '@prisma/client';

export const setChapterPages = async (
    chapterId: number,
    pages: ChapterPagesDto,
    lang: LangType,
) => {
    const data: Prisma.ChapterPagesUpdateInput = {};
    data[lang] = { ...pages };
    const savedPages = await prisma.chapterPages.update({
        where: { chapterId },
        data,
        select: { ru: lang === 'ru', en: lang === 'en' },
    });
    return ChapterPagesScheme.parse(savedPages[lang]);
};
