import { createZodDto } from '@anatine/zod-nestjs';
import { MangaType } from '@prisma/client';
import { z } from 'zod';

export const MangaTypeEnum = z.nativeEnum(MangaType);

export const MangaTypeScheme = z.object({
    type: MangaTypeEnum.optional(),
});
export class MangaTypeDto extends createZodDto(MangaTypeScheme) {}
