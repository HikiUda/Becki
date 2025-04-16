import { prisma } from 'src/common/helpers/prisma';
import { RateFullStatisticType, RateStatisticScheme } from '../dto/rateStatistic';
import { emptyRateStatistic } from '../../../mock/mockRateStatistic';

export const getRateStatistic = async (mangaId: number): Promise<RateFullStatisticType | null> => {
    const data = await prisma.manga.findUnique({
        where: { id: mangaId },
        select: {
            mangaStatistic: { select: { rateStatistic: true, rate: true, rateCount: true } },
        },
    });
    if (!data?.mangaStatistic) return null;

    const rateStatistic = RateStatisticScheme.safeParse(data.mangaStatistic.rateStatistic);

    return {
        rate: data.mangaStatistic.rate,
        rateCount: data.mangaStatistic.rateCount,
        rateStatistic: rateStatistic.success
            ? rateStatistic.data.rateStatistic
            : emptyRateStatistic.rateStatistic,
    };
};
