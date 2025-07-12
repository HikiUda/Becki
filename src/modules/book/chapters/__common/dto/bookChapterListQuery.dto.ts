import { createZodDto } from '@anatine/zod-nestjs';
import { PaginationQuerySchema } from 'src/shared/dto/pagination.dto';
import { z } from 'zod';

export const BookChapterListQuerySchema = z
    .object({
        search: z.string().default(''),
        order: z.enum(['asc', 'desc']).default('desc'),
    })
    .merge(PaginationQuerySchema);

export class BookChapterListQuery extends createZodDto(BookChapterListQuerySchema) {}
