import { createZodDto } from '@anatine/zod-nestjs';
import { MangaStatus } from '@prisma/client';
import { z } from 'zod';

export const BookStatusEnum = z.nativeEnum(MangaStatus);

export const BookStatusScheme = z.object({
    status: BookStatusEnum.optional(),
});
export const BookStatusArrayScheme = z.array(BookStatusEnum);
export class BookStatusDto extends createZodDto(BookStatusScheme) {}
