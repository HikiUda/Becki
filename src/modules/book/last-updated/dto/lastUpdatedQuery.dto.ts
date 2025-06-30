import { createZodDto } from '@anatine/zod-nestjs';
import { LangQueryScheme } from 'src/shared/dto/query/langQuery.dto';
import { PaginationQueryScheme } from 'src/shared/dto/query/pagination.dto';
import { z } from 'zod';

const LastUpdatedScopeEnum = z.enum(['all', 'popular', 'my']).describe('"my" for authorized users');
export type LastUpdatedScope = z.infer<typeof LastUpdatedScopeEnum>;

const LastUpdatedQueryScheme = z
    .object({
        scope: LastUpdatedScopeEnum.default('all'),
    })
    .merge(LangQueryScheme)
    .merge(PaginationQueryScheme);

export class LastUpdatedQuery extends createZodDto(LastUpdatedQueryScheme) {}
