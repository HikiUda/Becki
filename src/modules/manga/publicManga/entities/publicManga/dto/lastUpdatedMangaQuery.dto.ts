import { createZodDto } from '@anatine/zod-nestjs';
import { LangQueryScheme } from 'src/shared/dto/query/langQuery.dto';
import { PaginationQueryScheme } from 'src/shared/dto/query/pagination.dto';
import { z } from 'zod';

const MangaListItemLastUpdatedScopeEnum = z
    .enum(['all', 'popular', 'my'])
    .describe('"my" for authorized users');
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
