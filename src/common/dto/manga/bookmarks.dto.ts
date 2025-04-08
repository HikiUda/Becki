import { createZodDto } from '@anatine/zod-nestjs';
import { Bookmarks } from '@prisma/client';
import { z } from 'zod';

export const BookmarksEnum = z.nativeEnum(Bookmarks);

export const BookmarkScheme = z.object({
    bookmark: BookmarksEnum.optional(),
});
export const BookmarksScheme = z.object({
    bookmarks: z.array(BookmarksEnum).default([]),
});
export class BookmarksDto extends createZodDto(BookmarksScheme) {}
export class BookmarkDto extends createZodDto(BookmarkScheme) {}
