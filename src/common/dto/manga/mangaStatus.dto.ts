import { createZodDto } from '@anatine/zod-nestjs';
import { MangaStatus } from '@prisma/client';
import { z } from 'zod';

export const MangaStatusEnum = z.nativeEnum(MangaStatus);

export const MangaStatusScheme = z.object({
    status: MangaStatusEnum.optional(),
});
export class MangaStatusDto extends createZodDto(MangaStatusScheme) {}
