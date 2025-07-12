import { createZodDto } from '@anatine/zod-nestjs';
import { BookLang } from '@prisma/client';
import { PaginationQuerySchema } from 'src/shared/dto/pagination.dto';
import { z } from 'zod';

const LastUpdatedScopeEnum = z.enum(['all', 'popular', 'my']).describe('"my" for authorized users');
export type LastUpdatedScope = z.infer<typeof LastUpdatedScopeEnum>;

const LastUpdatedQueryScheme = z
    .object({
        scope: LastUpdatedScopeEnum.default('all'),
        bookLang: z.nativeEnum(BookLang).optional(),
    })
    .merge(PaginationQuerySchema);

export class LastUpdatedQuery extends createZodDto(LastUpdatedQueryScheme) {}
