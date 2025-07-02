import { z } from 'zod';
import { OrderEnum, SortByEnum } from './sortByOrder.schema';
import { StringToNumberArray, StringToStringArray } from './stringToArray';
import { BookStatusEnum } from 'src/modules/book/_common/model/bookStatus';
import { BookmarksEnum } from 'src/modules/book/_common/model/bookmarks';
import { AgeRating, AgeRatingEnum } from 'src/modules/book/_common/model/ageRating';
import { RangeScheme, refineRanges } from './rangeScheme';
import { LangQueryScheme } from 'src/shared/dto/query/langQuery.dto';
import { PaginationQueryScheme } from 'src/shared/dto/query/pagination.dto';
import { Bookmarks, BookStatus } from '@prisma/client';

export const CatalogQueryBase = z
    .object({
        search: z.string().optional(),
        sortBy: SortByEnum.default('rating'),
        order: OrderEnum.default('desc'),
        genres: StringToNumberArray.describe('Comma-separated list of number, e.g. "1,2,3"'),
        tags: StringToNumberArray.describe('Comma-separated list of number, e.g. "1,2,3"'),
        notGenres: StringToNumberArray.describe('Comma-separated list of number, e.g. "1,2,3"'),
        notTags: StringToNumberArray.describe('Comma-separated list of number, e.g. "1,2,3"'),
        ageRating: StringToNumberArray.describe(Object.values(AgeRating).join(',')).pipe(
            z.array(AgeRatingEnum),
        ),
        status: StringToStringArray.describe(Object.values(BookStatus).join(',')).pipe(
            z.array(BookStatusEnum),
        ),
        bookmarks: StringToStringArray.describe(Object.values(Bookmarks).join(',')).pipe(
            z.array(BookmarksEnum),
        ),
    })
    .merge(RangeScheme)
    .merge(LangQueryScheme)
    .merge(PaginationQueryScheme);
