import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const PaginationQueryScheme = z.object({
    page: z.coerce.number().int().default(1),
    limit: z.coerce.number().min(1).default(10),
});

export class PaginationQueryDto extends createZodDto(PaginationQueryScheme) {}
