import { createZodDto } from '@anatine/zod-nestjs';
import { transformBookId } from 'src/modules/book/_common/pipes/validateBookIdPipe';
import { z } from 'zod';

const EditMangaChapterParams = z.object({
    mangaId: transformBookId,
    chapterId: z.coerce.number().int(),
});

const EditRanobeChapterParams = z.object({
    ranobeId: transformBookId,
    chapterId: z.coerce.number().int(),
});

export class EditMangaChapterParamsDto extends createZodDto(EditMangaChapterParams) {}
export class EditRanobeChapterParamsDto extends createZodDto(EditRanobeChapterParams) {}
export type EditBookChapterParamsDto = EditMangaChapterParamsDto | EditRanobeChapterParamsDto;
