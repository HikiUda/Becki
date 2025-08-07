import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const AddCommentSchema = z.object({
    content: z.string().min(1),
    parentId: z.number().int().nullable(),
});
export class AddCommentDto extends createZodDto(AddCommentSchema) {}

const UpdateCommentSchema = z.object({
    content: z.string().min(1),
});
export class UpdateCommentDto extends createZodDto(UpdateCommentSchema) {}
