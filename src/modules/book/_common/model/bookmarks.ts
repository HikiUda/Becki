import { Bookmarks } from '@prisma/client';
import { z } from 'zod';

export const BookmarksEnum = z.nativeEnum(Bookmarks);
