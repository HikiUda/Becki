import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const LangTypeEnum = z.enum(['ru', 'en']);
export type LangType = z.infer<typeof LangTypeEnum>;

export const LangQueryScheme = z.object({
    lang: LangTypeEnum.default('ru'),
});

export class LangQueryDto extends createZodDto(LangQueryScheme) {}
