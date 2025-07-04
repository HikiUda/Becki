import { Prisma, PrismaClient } from '@prisma/client';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { EditedBookCategory } from '../dto/editedBook.dto';

function toEditedBookCategory(
    categories: { id: number; ru: string; en?: string | null }[],
    lang: Lang,
): EditedBookCategory[] {
    return categories.map((category) => ({
        id: category.id,
        title: category[lang] || category.ru,
    }));
}

export const getEditedBookCategories = async (
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
        genres: toEditedBookCategory(genres, lang),
        tags: toEditedBookCategory(tags, lang),
    };
};

export type GetEditedBookCategories = Prisma.PromiseReturnType<typeof getEditedBookCategories>;
