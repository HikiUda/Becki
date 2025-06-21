import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { prisma } from 'src/shared/prisma/prisma';
import { ChapterPagesScheme } from '../dto/chapterPages.scheme';

export const getChapterPages = async (chapterId: number, lang: LangType) => {
    const pages = await prisma.chapterPages.findFirst({
        where: { chapterId },
        select: { ru: lang === 'ru', en: lang === 'en' },
    });

    if (!pages || !pages[lang]) return null;

    return ChapterPagesScheme.parse(pages[lang]);
};
