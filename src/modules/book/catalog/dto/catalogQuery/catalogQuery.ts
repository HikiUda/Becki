import { LangQueryScheme } from 'src/shared/dto/query/langQuery.dto';
import { PaginationQueryScheme } from 'src/shared/dto/query/pagination.dto';
import { z } from 'zod';
import { RangeScheme, refineRanges } from './rangeScheme';
import { OrderEnum, SortByEnum } from './sortByOrder.schema';
import { StringToNumberArray, StringToStringArray } from './stringToArray';
import { BookStatusEnum } from 'src/modules/book/_common/types/bookStatus';
import { BookmarksEnum } from 'src/modules/book/_common/types/bookmarks';
import { AgeRatingEnum } from 'src/modules/book/_common/types/ageRating';

export const CatalogQuery = z
    .object({
        search: z.string().optional(),
        sortBy: SortByEnum.default('rating'),
        order: OrderEnum.default('desc'),
        genres: StringToNumberArray,
        tags: StringToNumberArray,
        notGenres: StringToNumberArray,
        notTags: StringToNumberArray,
        ageRating: StringToNumberArray.pipe(z.array(AgeRatingEnum)),
        status: StringToStringArray.pipe(z.array(BookStatusEnum)),
        bookmarks: StringToStringArray.pipe(z.array(BookmarksEnum)),
    })
    .and(RangeScheme)
    .and(LangQueryScheme)
    .and(PaginationQueryScheme)
    .superRefine(refineRanges);
