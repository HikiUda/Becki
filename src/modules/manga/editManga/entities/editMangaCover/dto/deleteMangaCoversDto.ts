import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const DeleleMangaCoversScheme = z.object({
    coversId: z.number().int().array().min(1),
});

export class DeleleMangaCoversDto extends createZodDto(DeleleMangaCoversScheme) {}
