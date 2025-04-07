import { LangQueryScheme } from 'src/common/dto/langQuery.dto';
import { MangaListItemBaseDto } from './mangaListItemBase.dto';
import { createZodDto } from '@anatine/zod-nestjs';
import { Pagination } from 'src/common/types/pagination';
import { z } from 'zod';
import { PaginationQueryScheme } from 'src/common/dto/pagination.dto';

const MangaListItemLastUpdatedScopeEnum = z.enum(['all', 'popular', 'my']);
export type MangaListItemLastUpdatedScope = z.infer<typeof MangaListItemLastUpdatedScopeEnum>;

const MangaListItemLastUpdatedQueryDtoScheme = z
    .object({
        scope: MangaListItemLastUpdatedScopeEnum.default('all'),
    })
    .merge(LangQueryScheme)
    .merge(PaginationQueryScheme);

export class MangaListItemLastUpdatedQueryDto extends createZodDto(
    MangaListItemLastUpdatedQueryDtoScheme,
) {}

export type MangaListItemLastUpdatedDto = Pick<
    MangaListItemBaseDto,
    'id' | 'urlId' | 'title' | 'type' | 'cover' | 'tome' | 'chapter' | 'chapterCreatedAt'
>;

export type MangaListItemLastUpdatedPagination = Pagination<MangaListItemLastUpdatedDto>;
