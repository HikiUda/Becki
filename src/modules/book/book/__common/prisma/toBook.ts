import { Prisma, PrismaClient } from '@prisma/client';
import { getBookSelect } from './getBookSelect';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { Book } from '../dto/book.dto';
import { AgeRating } from 'src/modules/book/_common/model/ageRating';
import { GetBookCategories } from './getBookCategories';

const getBook = async (prisma: PrismaClient) => {
    return await prisma.book.findUnique({
        where: { id: 0 },
        select: getBookSelect('ru'),
    });
};
type GetBook = Prisma.PromiseReturnType<typeof getBook>;

export function toBook<T extends string>(
    data: Exclude<GetBook, null> & { type: T },
    categories: GetBookCategories,
    lang: Lang,
): Book & { type: T } {
    return {
        id: data.id,
        urlId: data.urlId,
        title: {
            ru: data.title?.ru || '',
            en: data.title?.en || null,
            origin: data.title?.origin || null,
        },
        otherTitles: data.title?.otherTitles?.split('\n') || [],
        description: data.description?.[lang] || data.description?.ru || '',
        rate: data.statistic?.rate || 0,
        rateCount: data.statistic?.rateCount || 0,
        releaseDate: data.releaseDate,
        ageRating: data.ageRating as AgeRating,
        status: data.status,
        type: data.type,
        genres: categories.genres,
        tags: categories.tags,
        cover: data.covers[0]?.cover || null,
        banner: data.banner,
        owner: { id: data.owner.id, name: data.owner.name, avatar: data.owner.avatar },
    };
}
