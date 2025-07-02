import { z } from 'zod';

export const transformBookId = z
    .string()
    .describe('urlId or just number id')
    .transform((value) => {
        if (!Number.isNaN(Number(value))) {
            return Number(value);
        }
        const extractId = value.split('---').slice(-1);

        if (!Number.isNaN(Number(extractId))) {
            return Number(extractId);
        }
        return null;
    });

// * BookId
export const MangaId = z.number().int().brand('MangaId');
export type MangaId = z.infer<typeof MangaId>;

export const RanobeId = z.number().int().brand('RanobeId');
export type RanobeId = z.infer<typeof RanobeId>;

export type BookId = MangaId | RanobeId;

// * BookChapterId
export const MangaChapterId = z.number().int().brand('MangaChapterId');
export type MangaChapterId = z.infer<typeof MangaChapterId>;

export const RanobeChapterId = z.number().int().brand('RanobeChapterId');
export type RanobeChapterId = z.infer<typeof RanobeChapterId>;

export type BookChapterId = MangaChapterId | RanobeChapterId;

// * BookIdParam
export const MangaIdParam = z.object({
    mangaId: transformBookId.pipe(MangaId),
});
export type MangaIdParam = z.infer<typeof MangaIdParam>;

export const RanobeIdParam = z.object({
    ranobeId: transformBookId.pipe(RanobeId),
});
export type RanobeIdParam = z.infer<typeof RanobeIdParam>;

export type BookIdParam = MangaIdParam | RanobeIdParam;

// * BookChapterIdParam
export const MangaChapterIdParam = z.object({
    chapterId: transformBookId.pipe(MangaChapterId),
});
export type MangaChapterIdParam = z.infer<typeof MangaChapterIdParam>;

export const RanobeChapterIdParam = z.object({
    chapterId: transformBookId.pipe(RanobeChapterId),
});
export type RanobeChapterIdParam = z.infer<typeof RanobeChapterIdParam>;

export type BookChapterIdParam = MangaChapterIdParam | RanobeChapterIdParam;
