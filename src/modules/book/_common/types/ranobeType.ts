import { RanobeType } from '@prisma/client';
import { z } from 'zod';

export const RanobeTypeEnum = z.nativeEnum(RanobeType);
