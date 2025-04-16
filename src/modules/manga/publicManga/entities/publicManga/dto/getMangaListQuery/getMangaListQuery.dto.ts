import { BookmarksScheme } from 'src/common/dto/manga/bookmarks.dto';
import { MangaStatusArrayScheme, MangaStatusScheme } from 'src/common/dto/manga/mangaStatus.dto';
import { MangaTypeArrayScheme, MangaTypeScheme } from 'src/common/dto/manga/mangaType.dto';
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

const tagsGenresScheme = z
    .string()
    .default('')
    .transform((val) => (val ? val.split(',').map((v) => parseInt(v)) : []))
    .pipe(z.number().int().array());

const StringToStringArray = z
    .string()
    .default('')
    .transform((val) => (val ? val.split(',') : []));

const MangaListQueryScheme = z
    .object({
        sortBy: SortByEnum.default('rating'),
        search: z.string().optional(),
        genres: tagsGenresScheme,
        tags: tagsGenresScheme,
        notGenres: tagsGenresScheme,
        notTags: tagsGenresScheme,
        status: StringToStringArray.pipe(MangaStatusArrayScheme),
        type: StringToStringArray.pipe(MangaTypeArrayScheme),
        bookmarks: StringToStringArray.pipe(BookmarksScheme),
    })
    .merge(LangQueryScheme)
    .merge(OrderQueryScheme)
    .merge(PaginationQueryScheme)
    .merge(RangeScheme)
    .superRefine(refineRanges);

export class MangaListQueryDto extends createZodDto(MangaListQueryScheme) {}
