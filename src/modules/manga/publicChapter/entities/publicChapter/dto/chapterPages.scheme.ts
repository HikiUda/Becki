import { z } from 'zod';

export const ChapterPageScheme = z.object({
    page: z.number().int(),
    src: z.string(),
});

export const ChapterPagesScheme = z.object({
    pageCount: z.number().int(),
    pages: ChapterPageScheme.array(),
});

export type ChapterPagesType = z.infer<typeof ChapterPagesScheme>;
