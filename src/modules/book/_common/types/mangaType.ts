import { MangaType } from '@prisma/client';
import { z } from 'zod';

export const MangaTypeEnum = z.nativeEnum(MangaType);
