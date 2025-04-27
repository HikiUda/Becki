import { createZodDto } from '@anatine/zod-nestjs';
import { LangQueryScheme } from 'src/common/dto/query/langQuery.dto';
import { z } from 'zod';

export const AddPageQueryScheme = z
    .object({
        returnValue: z.coerce.boolean().default(false),
    })
    .merge(LangQueryScheme);

export class AddPageQuery extends createZodDto(AddPageQueryScheme) {}
