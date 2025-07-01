import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const MutateBookChapterTitleSchema = z.object({
    ru: z.string().optional(),
    en: z.string().optional(),
});

export const MutateBookChapterSchema = z.object({
    title: MutateBookChapterTitleSchema.optional(),
    tome: z.number().int().optional(),
    chapter: z.number().optional(),
});

export class MutateBookChapterDto extends createZodDto(MutateBookChapterSchema) {}
