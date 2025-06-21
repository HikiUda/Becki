import { prisma } from 'src/shared/prisma/prisma';
import { RateFullStatisticType, RateStatisticScheme } from '../dto/rateStatistic';
import { emptyRateStatistic } from '../../../mock/mockRateStatistic';

export const getRateStatistic = async (mangaId: number): Promise<RateFullStatisticType | null> => {
    const data = await prisma.manga.findUnique({
        where: { id: mangaId },
        select: {
            statistic: { select: { rateStatistic: true, rate: true, rateCount: true } },
        },
    });
    if (!data?.statistic) return null;

    const rateStatistic = RateStatisticScheme.safeParse(data.statistic.rateStatistic);

    return {
        rate: data.statistic.rate,
        rateCount: data.statistic.rateCount,
        rateStatistic: rateStatistic.success
            ? rateStatistic.data.rateStatistic
            : emptyRateStatistic.rateStatistic,
    };
};
