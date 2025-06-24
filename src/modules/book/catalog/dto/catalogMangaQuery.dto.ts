import { z } from 'zod';
import { MangaTypeEnum } from '../../_common/types/mangaType';
import { StringToStringArray } from './catalogQuery/stringToArray';
import { CatalogQueryBase } from './catalogQuery/catalogQuery';
import { createZodDto } from '@anatine/zod-nestjs';
import { refineRanges } from './catalogQuery/rangeScheme';

export const CatalogMangaQuery = z
    .object({
        type: StringToStringArray.pipe(z.array(MangaTypeEnum)),
    })
    .merge(CatalogQueryBase)
    .superRefine(refineRanges);

export class CatalogMangaQueryDto extends createZodDto(CatalogMangaQuery) {}
