import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const Lang = {
    ru: 'ru',
    en: 'en',
} as const;

export const LangTypeEnum = z.nativeEnum(Lang);
export type LangType = z.infer<typeof LangTypeEnum>;

export const LangQueryScheme = z.object({
    lang: LangTypeEnum.default('ru'),
});

export class LangQueryDto extends createZodDto(LangQueryScheme) {}
