import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const DeleteQuickSearchLastScheme = z.object({
    search: z.string().nonempty(),
});

export class DeleteQuickSearchLastDto extends createZodDto(DeleteQuickSearchLastScheme) {}
