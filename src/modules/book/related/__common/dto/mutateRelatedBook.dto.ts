import { z } from 'zod';
import { BookRelationshipEnum, parseRelatedId } from '../bookRelated';
import { createZodDto } from '@anatine/zod-nestjs';

const UpdateRelatedBookSchema = z.object({
    relatedId: z.string().transform(parseRelatedId),
    relationship: BookRelationshipEnum,
});
export class UpdateRelatedBookDto extends createZodDto(UpdateRelatedBookSchema) {}

const DeleteRelatedBookSchema = z.object({
    relatedId: z.string().transform(parseRelatedId),
});
export class DeleteRelatedBookDto extends createZodDto(DeleteRelatedBookSchema) {}
