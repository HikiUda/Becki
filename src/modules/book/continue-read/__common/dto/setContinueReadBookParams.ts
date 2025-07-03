import { createZodDto } from '@anatine/zod-nestjs';
import {
    MangaChapterId,
    MangaIdParamSchema,
    RanobeChapterId,
    RanobeIdParamSchema,
} from 'src/modules/book/_common/model/bookId';
import { z } from 'zod';

const transformChapterId = z
    .string()
    .describe('number Id or null')
    .transform((value) => {
        if (!Number.isNaN(Number(value))) {
            return Number(value);
        }
        return null;
    });

const SetContinueReadMangaParamsSchema = z
    .object({
        chapterId: transformChapterId.pipe(MangaChapterId.nullable()),
    })
    .merge(MangaIdParamSchema);

const SetContinueReadRanobeParamsSchema = z
    .object({
        chapterId: transformChapterId.pipe(RanobeChapterId.nullable()),
    })
    .merge(RanobeIdParamSchema);

export class SetContinueReadMangaParams extends createZodDto(SetContinueReadMangaParamsSchema) {}
export class SetContinueReadRanobeParams extends createZodDto(SetContinueReadRanobeParamsSchema) {}
export type SetContinueReadBookParams = SetContinueReadMangaParams | SetContinueReadRanobeParams;
