import { createZodDto } from '@anatine/zod-nestjs';
import { transformBookId } from 'src/modules/book/_common/pipes/validateBookIdPipe';
import { z } from 'zod';

const SetMainMangaCoverParams = z.object({
    mangaId: transformBookId,
    coverId: z.coerce.number().int(),
});

const SetMainRanobeCoverParams = z.object({
    ranobeId: transformBookId,
    coverId: z.coerce.number().int(),
});

export class SetMainMangaCoverParamsDto extends createZodDto(SetMainMangaCoverParams) {}
export class SetMainRanobeCoverParamsDto extends createZodDto(SetMainRanobeCoverParams) {}
export type SetMainCoverParamsDto = SetMainMangaCoverParamsDto | SetMainRanobeCoverParamsDto;
