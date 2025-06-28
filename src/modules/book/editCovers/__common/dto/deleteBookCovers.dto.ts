import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const DeleleBookCoversScheme = z.object({
    coversId: z.number().int().array().min(1),
});

export class DeleleBookCoversDto extends createZodDto(DeleleBookCoversScheme) {}
