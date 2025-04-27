import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const ChapterPageTypeEnum = z.enum(['image', 'rive']);

export const ChapterPageScheme = z.object({
    page: z.number().int(),
    src: z.string(),
    type: ChapterPageTypeEnum,
});

export const ChapterPagesScheme = z.object({
    pageCount: z.number().int(),
    pages: ChapterPageScheme.array(),
});

export type ChapterPageType = z.infer<typeof ChapterPageScheme>;
export type ChapterPageTypeEnumType = z.infer<typeof ChapterPageTypeEnum>;
export class ChapterPagesDto extends createZodDto(ChapterPagesScheme) {}
