import { z } from 'zod';
import { transformId } from 'src/modules/manga/common/pipes/ValidateMangaIdPipe';
import { createZodDto } from '@anatine/zod-nestjs';

export const GetMangaChapterIdScheme = z.object({
    mangaId: transformId,
    chapterId: transformId,
});

export class GetMangaChapterIdDto extends createZodDto(GetMangaChapterIdScheme) {}
