import { BookStatus } from '@prisma/client';
import { z } from 'zod';

export const BookStatusEnum = z.nativeEnum(BookStatus);
