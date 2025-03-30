import { Prisma } from '@prisma/client';
import { MangaListQuery } from '../../dto/mangaListItem.dto';
import { getSearchOtherTitleInput } from '../common/getSearchOtherTitleInput';
import { getSearchTitleInput } from '../common/getSearchTitleInput';

export const getMangaListWhereInput = (query: MangaListQuery): Prisma.MangaWhereInput => {
    //TODO search by chapterCount and RateCount
    const where: Prisma.MangaWhereInput = {};
    const AND: Prisma.MangaWhereInput[] = [];
    if (query.search) {
        AND.push({
            OR: [
                { otherTitles: getSearchOtherTitleInput(query.search) },
                { title: getSearchTitleInput(query.search) },
            ],
        });
    }
    if (query.status) {
        AND.push({
            status: query.status,
        });
    }
    if (query.type) {
        AND.push({
            type: query.type,
        });
    }
    // By Janres
    if (query.janres.length) {
        AND.push({
            janres: {
                hasEvery: query.janres,
            },
        });
    }
    if (query.notJanres.length) {
        AND.push({
            NOT: {
                janres: {
                    hasSome: query.notJanres,
                },
            },
        });
    }
    // By Tags
    if (query.tags.length) {
        AND.push({
            tags: {
                hasEvery: query.tags,
            },
        });
    }
    if (query.notTags.length) {
        AND.push({
            NOT: {
                tags: {
                    hasSome: query.notTags,
                },
            },
        });
    }
    // By releaseDate
    if (query.releaseDateFrom) {
        AND.push({
            releaseDate: {
                gte: query.releaseDateFrom,
            },
        });
    }
    if (query.releaseDateTo) {
        AND.push({
            releaseDate: {
                lte: query.releaseDateTo,
            },
        });
    }
    // By Rate
    if (query.rateFrom) {
        AND.push({
            rate: {
                gte: query.rateFrom,
            },
        });
    }
    if (query.rateCountTo) {
        AND.push({
            rate: {
                lte: query.rateCountTo,
            },
        });
    }
    // By Age
    if (query.ageRateFrom) {
        AND.push({
            ageRate: {
                gte: query.ageRateFrom,
            },
        });
    }
    if (query.ageRateTo) {
        AND.push({
            ageRate: {
                lte: query.ageRateTo,
            },
        });
    }

    where.AND = AND;
    return where;
};
