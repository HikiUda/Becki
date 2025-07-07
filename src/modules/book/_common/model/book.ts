import { Bookmarks, BookStatus, MangaType, RanobeType } from '@prisma/client';
import { z } from 'zod';

export const BookStatusEnum = z.nativeEnum(BookStatus);
export const BookmarksEnum = z.nativeEnum(Bookmarks);
export const MangaTypeEnum = z.nativeEnum(MangaType);
export const RanobeTypeEnum = z.nativeEnum(RanobeType);
