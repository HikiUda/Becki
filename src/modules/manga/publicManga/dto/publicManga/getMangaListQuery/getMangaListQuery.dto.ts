import { BookmarksScheme } from 'src/common/dto/manga/bookmarks.dto';
import { MangaStatusScheme } from 'src/common/dto/manga/mangaStatus.dto';
import { MangaTypeScheme } from 'src/common/dto/manga/mangaType.dto';
import { LangQueryScheme } from 'src/common/dto/query/langQuery.dto';
import { OrderQueryScheme } from 'src/common/dto/query/orderQuery';
import { PaginationQueryScheme } from 'src/common/dto/query/pagination.dto';
import { z } from 'zod';

import { createZodDto } from '@anatine/zod-nestjs';

import { RangeScheme, refineRanges } from './rangeScheme';

const SortByEnum = z.enum([
    'rating',
    'updateDate',
    'ruAlphabetically',
    'enAlphabetically',
    'views',
    'likes',
    'chapterCount',
]);
export type SortByType = z.infer<typeof SortByEnum>;

const tagsJanresScheme = z
    .string()
    .default('')
    .transform((val) => (val ? val.split(',').map((v) => parseInt(v)) : []))
    .pipe(z.number().int().array());

const MangaListQueryScheme = z
    .object({
        sortBy: SortByEnum.default('rating'),
        search: z.string().optional(),
        janres: tagsJanresScheme,
        tags: tagsJanresScheme,
        notJanres: tagsJanresScheme,
        notTags: tagsJanresScheme,
    })
    .merge(LangQueryScheme)
    .merge(OrderQueryScheme)
    .merge(PaginationQueryScheme)
    .merge(MangaStatusScheme)
    .merge(MangaTypeScheme)
    .merge(BookmarksScheme)
    .merge(RangeScheme)
    .superRefine(refineRanges);

export class MangaListQueryDto extends createZodDto(MangaListQueryScheme) {}
