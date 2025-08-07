import { createZodDto } from '@anatine/zod-nestjs';
import { MangaIdParamSchema, RanobeIdParamSchema } from 'src/modules/book/_common/model/bookId';
import { z } from 'zod';

// * BookCommentId
export const MangaCommentId = z.coerce.number().int().brand('MangaCommentId');
export type MangaCommentId = z.infer<typeof MangaCommentId>;

export const RanobeCommentId = z.coerce.number().int().brand('RanobeCommentId');
export type RanobeCommentId = z.infer<typeof RanobeCommentId>;

export type BookCommentId = MangaCommentId | RanobeCommentId;

// * BookCommentIdParam
export const MangaCommentIdParamSchema = z
    .object({
        commentId: MangaCommentId,
    })
    .merge(MangaIdParamSchema);
export class MangaCommentIdParam extends createZodDto(MangaCommentIdParamSchema) {}

export const RanobeCommentIdParamSchema = z
    .object({
        commentId: RanobeCommentId,
    })
    .merge(RanobeIdParamSchema);
export class RanobeCommentIdParam extends createZodDto(RanobeCommentIdParamSchema) {}

export type BookCommentIdParam = MangaCommentIdParam | RanobeCommentIdParam;
