import { createZodDto } from '@anatine/zod-nestjs';
import { transformBookId } from 'src/modules/book/_common/pipes/validateBookIdPipe';
import { z } from 'zod';

const EditMangaChapterParamsSchema = z.object({
    mangaId: transformBookId,
    chapterId: z.coerce.number().int(),
});

const EditRanobeChapterParamsSchema = z.object({
    ranobeId: transformBookId,
    chapterId: z.coerce.number().int(),
});

export class EditMangaChapterParams extends createZodDto(EditMangaChapterParamsSchema) {}
export class EditRanobeChapterParams extends createZodDto(EditRanobeChapterParamsSchema) {}
export type EditBookChapterParams = EditMangaChapterParams | EditRanobeChapterParams;
