import { BookmarksScheme } from 'src/shared/dto/book/bookmarks.dto';
import { BookStatusArrayScheme } from 'src/shared/dto/book/bookStatus.dto';
import { MangaTypeArrayScheme } from 'src/shared/dto/book/mangaType.dto';
import { LangQueryScheme } from 'src/shared/dto/query/langQuery.dto';
import { OrderQueryScheme } from 'src/shared/dto/query/orderQuery';
import { PaginationQueryScheme } from 'src/shared/dto/query/pagination.dto';
import { z } from 'zod';

import { createZodDto } from '@anatine/zod-nestjs';

import { RangeScheme, refineRanges } from './rangeScheme';

const SortByEnum = z.enum([
    'rating',
    'updateDate',
    'createDate',
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
    .describe('Comma-separated list of categories IDs, e.g. "1,2,3"')
    .transform((val) => (val ? val.split(',').map((v) => parseInt(v)) : []))
    .pipe(z.number().int().array());

const StringToStringArray = z
    .string()
    .default('')
    .describe('Comma-separated list, e.g. "el1,el2,el3"')
    .transform((val) => (val ? val.split(',') : []));

const MangaListQueryScheme = z
    .object({
        sortBy: SortByEnum.default('rating'),
        search: z.string().optional(),
        genres: tagsGenresScheme,
        tags: tagsGenresScheme,
        notGenres: tagsGenresScheme,
        notTags: tagsGenresScheme,
        status: StringToStringArray.pipe(BookStatusArrayScheme),
        type: StringToStringArray.pipe(MangaTypeArrayScheme),
        bookmarks: StringToStringArray.pipe(BookmarksScheme),
    })
    .merge(LangQueryScheme)
    .merge(OrderQueryScheme)
    .merge(PaginationQueryScheme)
    .merge(RangeScheme)
    .superRefine(refineRanges);

export class MangaListQueryDto extends createZodDto(MangaListQueryScheme) {}
