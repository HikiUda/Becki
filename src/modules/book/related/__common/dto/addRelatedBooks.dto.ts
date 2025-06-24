import { z } from 'zod';
import { BookRelated, BookRelationshipEnum } from '../bookRelated';
import { createZodDto } from '@anatine/zod-nestjs';

export const AddBookRelatedSchema = z.record(z.string(), BookRelationshipEnum);
export type AddBookRelated = z.infer<typeof AddBookRelatedSchema>;

const AddRelatedBooksSchema = z.object({
    data: AddBookRelatedSchema,
});
export class AddRelatedBooksDto extends createZodDto(AddRelatedBooksSchema) {}

export type BooksByUrlIds = {
    manga: { id: number; urlId: string }[];
    ranobe: { id: number; urlId: string }[];
};

export function getAddedRelatedBook(
    { manga, ranobe }: BooksByUrlIds,
    data: AddBookRelated,
    bookRelated: BookRelated,
) {
    const addedManga = manga.map((m) => [m.id, data[m.urlId] || 'Other'] as const);
    const addedRanobe = ranobe.map((r) => [r.id, data[r.urlId] || 'Other'] as const);
    return {
        ...(addedManga.length
            ? { manga: { ...bookRelated.manga, ...Object.fromEntries(addedManga) } }
            : {}),
        ...(addedRanobe.length
            ? { ranobe: { ...bookRelated.ranobe, ...Object.fromEntries(addedRanobe) } }
            : {}),
    };
}
