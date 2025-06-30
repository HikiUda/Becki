import { z } from 'zod';
import { MangaTypeEnum } from '../../_common/types/mangaType';
import { StringToStringArray } from './catalogQuery/stringToArray';
import { CatalogQueryBase } from './catalogQuery/catalogQuery';
import { createZodDto } from '@anatine/zod-nestjs';
import { refineRanges } from './catalogQuery/rangeScheme';
import { MangaType } from '@prisma/client';

export const CatalogMangaQuerySchema = z
    .object({
        type: StringToStringArray.describe(Object.values(MangaType).join(',')).pipe(
            z.array(MangaTypeEnum),
        ),
    })
    .merge(CatalogQueryBase)
    .superRefine(refineRanges);

export class CatalogMangaQuery extends createZodDto(CatalogMangaQuerySchema) {}
