import { MutateMangaTitleScheme, MutateMangaOtherTitlesScheme } from './mutateTitles';
import { z } from 'zod';
import { BookStatusEnum } from 'src/shared/dto/book/bookStatus.dto';
import { MangaTypeEnum } from 'src/shared/dto/book/mangaType.dto';
import { createZodDto } from '@anatine/zod-nestjs';

export const MutateMangaDescriptionScheme = z.object({
    ru: z.string().optional(),
    en: z.string().optional(),
});

export type MutateMangaDescriptionType = z.infer<typeof MutateMangaDescriptionScheme>;

export const MutateMangaCategoriesScheme = z.object({
    add: z.number().int().array().optional(),
    delete: z.number().int().array().optional(),
    set: z.number().int().array().optional(),
});

export type MutateMangaCategoriesType = z.infer<typeof MutateMangaCategoriesScheme>;

export const MutateMangaAuthorsScheme = z.object({
    add: z.string().array().optional(),
    delete: z.number().int().array().optional(),
});

export type MutateMangaAuthorsType = z.infer<typeof MutateMangaAuthorsScheme>;

export const MutateMangaScheme = z.object({
    urlId: z.string().optional(),
    title: MutateMangaTitleScheme.optional(),
    otherTitles: MutateMangaOtherTitlesScheme.optional(),
    description: MutateMangaDescriptionScheme.optional(),
    status: BookStatusEnum.optional(),
    type: MangaTypeEnum.optional(),
    releaseDate: z.coerce.date().optional(),
    genres: MutateMangaCategoriesScheme.optional(),
    tags: MutateMangaCategoriesScheme.optional(),
    coverId: z.number().int().optional(),
    banner: z.string().optional(),
    ageRate: z.number().min(0),
    authors: MutateMangaAuthorsScheme.optional(),
    artists: MutateMangaAuthorsScheme.optional(),
    publishers: MutateMangaAuthorsScheme.optional(),
});
export class MutateMangaDto extends createZodDto(MutateMangaScheme) {}
export type MutateMangaType = z.infer<typeof MutateMangaScheme>;
