import { z } from 'zod';

export const UpdateMangaOtherTitleScheme = z.object({
    id: z.number().int(),
    title: z.string().min(1),
});

export type UpdateMangaOtherTitleType = z.infer<typeof UpdateMangaOtherTitleScheme>;

export const MutateMangaOtherTitlesScheme = z.object({
    createTitles: z.string().array().optional(),
    updateTitles: UpdateMangaOtherTitleScheme.array().optional(),
    deleteTitles: z.number().array().optional(),
});

export type MutateMangaOtherTitlesType = z.infer<typeof MutateMangaOtherTitlesScheme>;

export const MutateMangaTitleScheme = z.object({
    ru: z.string().optional(),
    en: z.string().optional(),
    origin: z.string().optional(),
});

export type MutateMangaTitleType = z.infer<typeof MutateMangaTitleScheme>;
