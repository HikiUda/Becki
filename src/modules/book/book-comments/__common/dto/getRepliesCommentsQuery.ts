import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const GetRepliesCommentsQuerySchema = z.object({
    depthLimit: z.coerce.number().int().default(3),
    depthStep: z.coerce.number().int().default(1),
});

export class GetRepliesCommentsQuery extends createZodDto(GetRepliesCommentsQuerySchema) {}
