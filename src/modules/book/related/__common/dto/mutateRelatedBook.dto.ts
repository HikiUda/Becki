import { z } from 'zod';
import { BookRelationshipEnum } from '../bookRelated';
import { createZodDto } from '@anatine/zod-nestjs';

const parseRelatedId = (relatedId: string) => {
    const parsed = relatedId.split('---');
    return [parsed[0], Number(parsed[1])] as const;
};

const ParsedRelatedIdSchema = z.tuple([z.enum(['manga', 'ranobe']), z.number().int()]);
export type ParsedRelatedId = z.infer<typeof ParsedRelatedIdSchema>;

const UpdateRelatedBookSchema = z.object({
    relatedId: z.string().transform(parseRelatedId).pipe(ParsedRelatedIdSchema),
    relationship: BookRelationshipEnum,
});
export class UpdateRelatedBookDto extends createZodDto(UpdateRelatedBookSchema) {}

const DeleteRelatedBookSchema = z.object({
    relatedId: z.string().transform(parseRelatedId).pipe(ParsedRelatedIdSchema),
});
export class DeleteRelatedBookDto extends createZodDto(DeleteRelatedBookSchema) {}
