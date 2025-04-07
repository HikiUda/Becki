import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const DeleteSearchScheme = z.object({
    search: z.string().nonempty(),
});

export class DeleteSearchDto extends createZodDto(DeleteSearchScheme) {}
