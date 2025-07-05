import { createZodDto } from '@anatine/zod-nestjs';
import { LangQuerySchema } from 'src/shared/dto/langQuery.dto';
import { z } from 'zod';

const GetCategoriesQuerySchema = z
    .object({
        search: z.string().default(''),
    })
    .merge(LangQuerySchema);

export class GetCategoriesQuery extends createZodDto(GetCategoriesQuerySchema) {}
