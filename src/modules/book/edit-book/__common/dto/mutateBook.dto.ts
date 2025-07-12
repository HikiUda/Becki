import { z } from 'zod';
import { AgeRatingEnum } from 'src/modules/book/_common/model/ageRating';
import { BookStatusEnum } from 'src/modules/book/_common/model/book';
import { BookLang } from '@prisma/client';

export const MutateBookTitleSchema = z.object({
    main: z.string().optional(),
    en: z.string().optional(),
    origin: z.string().optional(),
});
export type MutateBookTitle = z.infer<typeof MutateBookTitleSchema>;

export const getMutateBookSchema = <T extends z.ZodTypeAny>(type: T) =>
    z.object({
        urlId: z.string().optional(),
        title: MutateBookTitleSchema.optional(),
        otherTitles: z.string().array().optional(),
        description: z.string().optional(),
        type,
        status: BookStatusEnum.optional(),
        releaseDate: z.coerce.date().optional(),
        genres: z.number().int().array().optional(),
        tags: z.number().int().array().optional(),
        banner: z.string().optional().describe('Only Becki field process'),
        ageRating: AgeRatingEnum.optional(),
        authors: z.number().int().array().optional(),
        artists: z.number().int().array().optional(),
        publishers: z.number().int().array().optional(),
        lang: z.nativeEnum(BookLang).optional(),
    });

const MutateBookSchema = getMutateBookSchema(z.string().optional());
export type MutateBookDto = z.infer<typeof MutateBookSchema>;
export const getParseBodyMutateBook = <T extends z.ZodTypeAny>(schema: T) =>
    z
        .string()
        .transform((val) => JSON.parse(val))
        .pipe(schema);
