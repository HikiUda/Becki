import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const DeleteMangaChapterPageSchema = z.object({
    page: z.string(),
});

export class DeleteMangaChapterPage extends createZodDto(DeleteMangaChapterPageSchema) {}
