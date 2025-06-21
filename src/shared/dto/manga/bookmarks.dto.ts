import { createZodDto } from '@anatine/zod-nestjs';
import { Bookmarks } from '@prisma/client';
import { z } from 'zod';

export const BookmarksEnum = z.nativeEnum(Bookmarks);

export const BookmarkScheme = z.object({
    bookmark: BookmarksEnum,
});
export const BookmarksScheme = z.array(BookmarksEnum);
export class BookmarksDto extends createZodDto(BookmarksScheme) {}
export class BookmarkDto extends createZodDto(BookmarkScheme) {}
