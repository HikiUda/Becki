import { createZodDto } from '@anatine/zod-nestjs';
import { LangQueryScheme } from 'src/common/dto/query/langQuery.dto';
import { z } from 'zod';

const GetCategoryQueryScheme = z
    .object({
        search: z.string().default(''),
    })
    .merge(LangQueryScheme);

export class GetCategoryQuery extends createZodDto(GetCategoryQueryScheme) {}
