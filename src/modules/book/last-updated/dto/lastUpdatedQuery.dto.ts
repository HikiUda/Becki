import { createZodDto } from '@anatine/zod-nestjs';
import { LangQuerySchema } from 'src/shared/dto/langQuery.dto';
import { PaginationQuerySchema } from 'src/shared/dto/pagination.dto';
import { z } from 'zod';

const LastUpdatedScopeEnum = z.enum(['all', 'popular', 'my']).describe('"my" for authorized users');
export type LastUpdatedScope = z.infer<typeof LastUpdatedScopeEnum>;

const LastUpdatedQueryScheme = z
    .object({
        scope: LastUpdatedScopeEnum.default('all'),
    })
    .merge(LangQuerySchema)
    .merge(PaginationQuerySchema);

export class LastUpdatedQuery extends createZodDto(LastUpdatedQueryScheme) {}
