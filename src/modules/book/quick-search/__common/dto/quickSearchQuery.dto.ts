import { createZodDto } from '@anatine/zod-nestjs';
import { LangQueryScheme } from 'src/shared/dto/langQuery.dto';
import { z } from 'zod';

const QuickSearchQuerySchema = z
    .object({
        search: z.string().default(''),
        limit: z.coerce.number().default(6),
    })
    .merge(LangQueryScheme);

export class QuickSearchQuery extends createZodDto(QuickSearchQuerySchema) {}
