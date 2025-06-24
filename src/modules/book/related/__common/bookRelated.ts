import { z } from 'zod';

export const BookRelationship = {
    Continuation: 'Continuation',
    Prequel: 'Prequel',
    Adaptation: 'Adaptation',
    Source: 'Source',
    Spinoff: 'Spinoff',
    Other: 'Other',
} as const;

export const BookRelationshipEnum = z.nativeEnum(BookRelationship);
export type BookRelationship = z.infer<typeof BookRelationshipEnum>;

export const BookRelatedSchema = z.record(z.string().regex(/^\d+$/), BookRelationshipEnum);

export const BookRelated = z.object({
    manga: BookRelatedSchema,
    ranobe: BookRelatedSchema,
});
export type BookRelated = z.infer<typeof BookRelated>;
export const BookRelatedDefault: BookRelated = {
    manga: {},
    ranobe: {},
};
