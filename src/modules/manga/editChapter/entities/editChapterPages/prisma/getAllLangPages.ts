import { prisma } from 'src/shared/prisma/prisma';
import { ChapterPagesScheme } from '../dto/chapterPages.scheme';
import { Lang } from 'src/shared/dto/query/langQuery.dto';
import { AllLangPagesType } from '../dto/allLangPages';

export const getAllLangPages = async (chapterId: number) => {
    const data = await prisma.chapterPages.findFirst({
        where: { chapterId },
    });

    //TODO auto
    const pages: AllLangPagesType = {
        ru: null,
        en: null,
    };
    if (!data) return pages;

    Object.values(Lang).forEach(
        (lang) => (pages[lang] = data[lang] !== null ? ChapterPagesScheme.parse(data[lang]) : null),
    );

    return pages;
};
