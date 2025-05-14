import { createZodDto } from '@anatine/zod-nestjs';
import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const ChapterPageTypeEnum = z.enum(['image', 'rive']);

export const ChapterPageScheme = z.object({
    src: z.string(),
    //TODO edit containerMaxWidth

    type: ChapterPageTypeEnum,
});

export const ChapterPagesScheme = z.object({
    pageCount: z.number().int(),
    containerMaxWidth: z.number().default(700),
    pages: ChapterPageScheme.array(),
});

export type ChapterPageType = z.infer<typeof ChapterPageScheme>;
export type ChapterPageTypeEnumType = z.infer<typeof ChapterPageTypeEnum>;
export class ChapterPageDto extends createZodDto(ChapterPageScheme) {}
export class ChapterPagesDto extends createZodDto(ChapterPagesScheme) {
    @ApiProperty({ type: [ChapterPageDto] })
    pages: ChapterPageType[];
}
