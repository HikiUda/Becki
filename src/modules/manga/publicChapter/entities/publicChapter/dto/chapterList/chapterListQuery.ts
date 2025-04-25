import { createZodDto } from '@anatine/zod-nestjs';
import { LangQueryScheme } from 'src/common/dto/query/langQuery.dto';
import { OrderQueryScheme } from 'src/common/dto/query/orderQuery';
import { PaginationQueryScheme } from 'src/common/dto/query/pagination.dto';
import { z } from 'zod';

export const ChapterListQueryScheme = z
    .object({
        search: z.string().default(''),
    })
    .merge(LangQueryScheme)
    .merge(PaginationQueryScheme)
    .merge(OrderQueryScheme);

export class ChapterListQuery extends createZodDto(ChapterListQueryScheme) {}
