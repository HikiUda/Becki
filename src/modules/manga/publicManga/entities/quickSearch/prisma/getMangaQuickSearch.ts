import { Prisma } from '@prisma/client';
import { getSearchOtherTitleInput } from '../../../prisma/getSearchOtherTitleInput';
import { getSearchTitleInput } from '../../../prisma/getSearchTitleInput';
import { getMangaListStatistic } from '../../../prisma/getMangaListStatistic';

const args = (search: string): Prisma.MangaFindManyArgs => {
    return {
        take: 6,
        where: {
            OR: [
                { otherTitles: getSearchOtherTitleInput(search) },
                { title: getSearchTitleInput(search) },
            ],
        },
        orderBy: { mangaStatistic: { rate: 'desc' } },
    };
};

export const getMangaQuickSearch = async (search: string) => {
    return await getMangaListStatistic(args(search));
};
