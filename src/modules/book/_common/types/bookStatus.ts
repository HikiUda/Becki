import { MangaStatus } from '@prisma/client';
import { z } from 'zod';

export const BookStatusEnum = z.nativeEnum(MangaStatus);
