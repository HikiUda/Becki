import { createZodDto } from '@anatine/zod-nestjs';
import { LangQueryScheme } from 'src/common/dto/query/langQuery.dto';
import { z } from 'zod';

const QuickSearchQuerySceme = LangQueryScheme.extend({
    search: z.string().default(''),
});

export class QuickSearchQueryDto extends createZodDto(QuickSearchQuerySceme) {}
