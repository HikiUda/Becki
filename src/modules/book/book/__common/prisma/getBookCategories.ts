import { Prisma, PrismaClient } from '@prisma/client';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { BookCategory } from '../dto/book.dto';

function toBookCategory(
    categories: { id: number; ru: string; en?: string | null }[],
    lang: Lang,
): BookCategory[] {
    return categories.map((category) => ({
        id: category.id,
        title: category[lang] || category.ru,
    }));
}

export const getBookCategories = async (
    prisma: PrismaClient,
    { genresIds, tagsIds, lang }: { genresIds: number[]; tagsIds: number[]; lang: Lang },
) => {
    const genres = await prisma.bookGenres.findMany({
        where: { id: { in: genresIds } },
        select: {
            id: true,
            ru: true,
            en: lang === 'en',
        },
    });
    const tags = await prisma.bookTags.findMany({
        where: { id: { in: tagsIds } },
        select: {
            id: true,
            ru: true,
            en: lang === 'en',
        },
    });

    return {
        genres: toBookCategory(genres, lang),
        tags: toBookCategory(tags, lang),
    };
};

export type GetBookCategories = Prisma.PromiseReturnType<typeof getBookCategories>;
