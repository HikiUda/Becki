import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const DeleteBookCoversScheme = z.object({
    coversId: z.number().int().array().min(1),
});

export class DeleteBookCoversDto extends createZodDto(DeleteBookCoversScheme) {}
