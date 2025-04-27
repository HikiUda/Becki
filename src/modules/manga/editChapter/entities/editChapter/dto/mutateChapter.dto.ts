import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const MutateChapterTitleScheme = z.object({
    ru: z.string().optional(),
    en: z.string().optional(),
});

export const MutateChapterScheme = z.object({
    title: MutateChapterTitleScheme.optional(),
    tome: z.number().int().optional(),
    chapter: z.number().optional(),
    private: z.boolean().optional(),
});

export class MutateChapterDto extends createZodDto(MutateChapterScheme) {}
