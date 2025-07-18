import { PercentItem } from 'src/modules/book/_common/model/bookStatistic';

export function computePercentItem(valueCount: number, allCount: number) {
    if (!valueCount)
        return {
            count: 0,
            percentage: 0,
        } satisfies PercentItem;
    return {
        count: valueCount,
        percentage: Math.round((valueCount / allCount) * 10000) / 100,
    } satisfies PercentItem;
}
