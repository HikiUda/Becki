import { LangType } from 'src/common/dto/query/langQuery.dto';
import { prisma } from 'src/common/helpers/prisma';
import { Prisma } from '@prisma/client';

export const deleteLangChapterPages = async (chapterId: number, lang: LangType) => {
    const data: Prisma.ChapterPagesUpdateInput = {};
    if (lang === 'ru') return;
    data[lang] = Prisma.JsonNull;
    await prisma.chapterPages.update({
        where: { chapterId },
        data,
    });
};
