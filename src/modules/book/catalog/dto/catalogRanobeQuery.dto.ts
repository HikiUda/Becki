import { z } from 'zod';
import { RanobeTypeEnum } from '../../_common/types/ranobeType';
import { StringToStringArray } from './catalogQuery/stringToArray';
import { CatalogQueryBase } from './catalogQuery/catalogQuery';
import { createZodDto } from '@anatine/zod-nestjs';
import { refineRanges } from './catalogQuery/rangeScheme';
import { RanobeType } from '@prisma/client';

export const CatalogRanobeQuerySchema = z
    .object({
        type: StringToStringArray.describe(Object.values(RanobeType).join(',')).pipe(
            z.array(RanobeTypeEnum),
        ),
    })
    .merge(CatalogQueryBase)
    .superRefine(refineRanges);

export class CatalogRanobeQuery extends createZodDto(CatalogRanobeQuerySchema) {}
