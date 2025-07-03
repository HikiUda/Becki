import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const transformBookId = z
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
export const MangaIdParamSchema = z.object({
    mangaId: transformBookId.pipe(MangaId),
});
export class MangaIdParam extends createZodDto(MangaIdParamSchema) {}

export const RanobeIdParamSchema = z.object({
    ranobeId: transformBookId.pipe(RanobeId),
});
export class RanobeIdParam extends createZodDto(RanobeIdParamSchema) {}

export type BookIdParam = MangaIdParam | RanobeIdParam;

// * BookChapterIdParam
// ? is really need seperate param for chapter
export const MangaChapterIdParamSchema = z.object({
    chapterId: transformBookId.pipe(MangaChapterId),
});
export class MangaChapterIdParam extends createZodDto(MangaChapterIdParamSchema) {}

export const RanobeChapterIdParamSchema = z.object({
    chapterId: transformBookId.pipe(RanobeChapterId),
});
export class RanobeChapterIdParam extends createZodDto(RanobeChapterIdParamSchema) {}

export type BookChapterIdParam = MangaChapterIdParam | RanobeChapterIdParam;

// * BookChapterParams
export const MangaChapterParamsSchema = MangaIdParamSchema.merge(MangaChapterIdParamSchema);
export const RanobeChapterParamsSchema = RanobeIdParamSchema.merge(RanobeChapterIdParamSchema);

export class MangaChapterParams extends createZodDto(MangaChapterParamsSchema) {}
export class RanobeChapterParams extends createZodDto(RanobeChapterParamsSchema) {}
export type BookChapterParams = MangaChapterParams | RanobeChapterParams;
