import { createZodDto } from '@anatine/zod-nestjs';
import { BookLang } from '@prisma/client';
import { z } from 'zod';

const QuickSearchQuerySchema = z.object({
    search: z.string().default(''),
    limit: z.coerce.number().default(6),
    bookLang: z.nativeEnum(BookLang),
});

export class QuickSearchQuery extends createZodDto(QuickSearchQuerySchema) {}
