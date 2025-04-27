import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const DeleteChapterPageScheme = z.object({
    pageSrc: z.string(),
});

export class DeleteChapterPageDto extends createZodDto(DeleteChapterPageScheme) {}
