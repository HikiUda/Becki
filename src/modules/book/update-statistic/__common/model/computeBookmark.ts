import { BookmarkStatistic } from 'src/modules/book/_common/model/bookStatistic';
import { computePercentItem } from './computePercentItem';

export function computeBookmarkStatistic(
    bookmarkCount: number,
    values: [number, number, number, number, number],
) {
    return {
        Reading: computePercentItem(values[0], bookmarkCount),
        Planned: computePercentItem(values[1], bookmarkCount),
        Readed: computePercentItem(values[2], bookmarkCount),
        Abandoned: computePercentItem(values[3], bookmarkCount),
        Postponed: computePercentItem(values[4], bookmarkCount),
    } satisfies BookmarkStatistic;
}
