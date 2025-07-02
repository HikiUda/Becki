import { z } from 'zod';
import { AgeRatingEnum } from 'src/modules/book/_common/model/ageRating';
import { BookStatusEnum } from 'src/modules/book/_common/model/bookStatus';

export const MutateBookTitleSchema = z.object({
    ru: z.string().optional(),
    en: z.string().optional(),
    origin: z.string().optional(),
});
export type MutateBookTitle = z.infer<typeof MutateBookTitleSchema>;

export const MutateBookDescriptionSchema = z.object({
    ru: z.string().optional(),
    en: z.string().optional(),
});
export type MutateBookDescription = z.infer<typeof MutateBookDescriptionSchema>;

export const getMutateBookSchema = <T extends z.ZodTypeAny>(type: T) =>
    z.object({
        urlId: z.string().optional(),
        title: MutateBookTitleSchema.optional(),
        otherTitles: z.string().array().optional(),
        description: MutateBookDescriptionSchema.optional(),
        type,
        status: BookStatusEnum.optional(),
        releaseDate: z.coerce.date().optional(),
        genres: z.number().int().array().optional(),
        tags: z.number().int().array().optional(),
        banner: z.string().optional().describe('Only Becki field process'),
        ageRating: AgeRatingEnum.optional(),
    });

const MutateBookSchema = getMutateBookSchema(z.string().optional());
export type MutateBookDto = z.infer<typeof MutateBookSchema>;
export const getParseBodyMutateBook = <T extends z.ZodTypeAny>(schema: T) =>
    z
        .string()
        .transform((val) => JSON.parse(val))
        .pipe(schema);
