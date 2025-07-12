import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const MutateBookChapterSchema = z.object({
    title: z.string().nullable().optional(),
    tome: z.number().int().optional(),
    chapter: z.number().optional(),
});

export class MutateBookChapterDto extends createZodDto(MutateBookChapterSchema) {}
