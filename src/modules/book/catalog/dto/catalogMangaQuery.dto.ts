import { z } from 'zod';
import { MangaTypeEnum } from '../../_common/types/mangaType';
import { StringToStringArray } from './catalogQuery/stringToArray';
import { CatalogQuery } from './catalogQuery/catalogQuery';
import { createZodDto } from '@anatine/zod-nestjs';

export const CatalogMangaQuery = z
    .object({
        type: StringToStringArray.pipe(z.array(MangaTypeEnum)),
    })
    .and(CatalogQuery);

export class CatalogMangaQueryDto extends createZodDto(CatalogMangaQuery) {}
