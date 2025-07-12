import { createZodDto } from '@anatine/zod-nestjs';
import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

const MangaChapterPagesView = {
    pages: 'pages',
    tape: 'tape',
} as const;
type MangaChapterPagesView = ValueOf<typeof MangaChapterPagesView>;

export const MangaChapterPagesSchema = z.object({
    view: z.nativeEnum(MangaChapterPagesView).default('pages'),
    pageCount: z.number().int().default(0),
    pages: z.string().array().or(z.array(z.string().array())).default([]),
});

export class MangaChapterPages extends createZodDto(MangaChapterPagesSchema) {}

export class MangaChapterPagesDto {
    @ApiProperty({ enum: MangaChapterPagesView })
    view: MangaChapterPagesView;
    @ApiProperty()
    pageCount: number;
    @ApiProperty({
        description: 'Массив страниц или массив массивов страниц',
        oneOf: [
            { type: 'array', items: { type: 'string' } },
            { type: 'array', items: { type: 'array', items: { type: 'string' } } },
        ],
    })
    pages: string[] | string[][];
}

export class PublicMangaChapterPages {
    @ApiProperty({ enum: MangaChapterPagesView })
    view: MangaChapterPagesView;
    @ApiProperty()
    pageCount: number;
    @ApiProperty()
    pages: string[];
}

export function isMangaChapterPagesNestedArray(
    pages: MangaChapterPages['pages'],
): pages is string[][] {
    return Array.isArray(pages[0]);
}
