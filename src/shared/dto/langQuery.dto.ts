import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const Lang = {
    ru: 'ru',
    en: 'en',
} as const;
export const LangEnum = z.nativeEnum(Lang);
export type Lang = z.infer<typeof LangEnum>;

export const LangQuerySchema = z.object({
    lang: LangEnum.default('ru'),
});
export class LangQuery extends createZodDto(LangQuerySchema) {}
