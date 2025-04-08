import { createZodDto } from '@anatine/zod-nestjs';
import { LangQueryScheme } from 'src/common/dto/query/langQuery.dto';
import { PaginationQueryScheme } from 'src/common/dto/query/pagination.dto';
import { z } from 'zod';

const MangaListItemLastUpdatedScopeEnum = z.enum(['all', 'popular', 'my']);
export type MangaListItemLastUpdatedScope = z.infer<typeof MangaListItemLastUpdatedScopeEnum>;
const MangaListItemLastUpdatedQueryScheme = z
    .object({
        scope: MangaListItemLastUpdatedScopeEnum.default('all'),
    })
    .merge(LangQueryScheme)
    .merge(PaginationQueryScheme);

export class MangaListItemLastUpdatedQueryDto extends createZodDto(
    MangaListItemLastUpdatedQueryScheme,
) {}
