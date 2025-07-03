import { createZodDto } from '@anatine/zod-nestjs';
import { MangaIdParamSchema, RanobeIdParamSchema } from 'src/modules/book/_common/model/bookId';
import { z } from 'zod';

const MangaCoverId = z.coerce.number().int().brand('MangaCoverId');
export type MangaCoverId = z.infer<typeof MangaCoverId>;

const RanobeCoverId = z.coerce.number().int().brand('RanobeCoverId');
export type RanobeCoverId = z.infer<typeof RanobeCoverId>;

export type BookCoverId = MangaCoverId | RanobeCoverId;

const SetMainMangaCoverParamsSchema = z
    .object({
        coverId: MangaCoverId,
    })
    .merge(MangaIdParamSchema);

const SetMainRanobeCoverParamsSchema = z
    .object({
        coverId: RanobeCoverId,
    })
    .merge(RanobeIdParamSchema);

export class SetMainMangaCoverParams extends createZodDto(SetMainMangaCoverParamsSchema) {}
export class SetMainRanobeCoverParams extends createZodDto(SetMainRanobeCoverParamsSchema) {}
export type SetMainCoverParams = SetMainMangaCoverParams | SetMainRanobeCoverParams;
