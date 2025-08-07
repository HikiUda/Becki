import { createZodDto } from '@anatine/zod-nestjs';
import { PaginationQuerySchema } from 'src/shared/dto/pagination.dto';
import { z } from 'zod';

const GetRootCommentsQuerySchema = z
    .object({
        commentId: z.number().int().optional(),
    })
    .merge(PaginationQuerySchema);

export class GetRootCommentsQuery extends createZodDto(GetRootCommentsQuerySchema) {}
