import { createZodDto } from '@anatine/zod-nestjs';
import { LangQueryScheme } from 'src/shared/dto/query/langQuery.dto';
import { OrderQueryScheme } from 'src/shared/dto/query/orderQuery';
import { PaginationQueryScheme } from 'src/shared/dto/query/pagination.dto';
import { z } from 'zod';

export const ChapterListQueryScheme = z
    .object({
        search: z.string().default(''),
    })
    .merge(LangQueryScheme)
    .merge(PaginationQueryScheme)
    .merge(OrderQueryScheme);

export class ChapterListQuery extends createZodDto(ChapterListQueryScheme) {}
