import { createZodDto } from '@anatine/zod-nestjs';
import { LangQueryScheme } from 'src/shared/dto/query/langQuery.dto';
import { z } from 'zod';

const QuickSearchQuerySchema = z
    .object({
        search: z.string().default(''),
        limit: z.coerce.number().default(6),
    })
    .and(LangQueryScheme);

export class QuickSearchQueryDto extends createZodDto(QuickSearchQuerySchema) {}
