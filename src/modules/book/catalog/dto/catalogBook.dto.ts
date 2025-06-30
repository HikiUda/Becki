import { Bookmarks } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger'; // импортируй свои типы

export abstract class CatalogBook {
    @ApiProperty()
    id: number;

    @ApiProperty()
    urlId: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    rate: number;

    abstract type: string;

    @ApiProperty()
    cover: string;

    @ApiProperty({ enum: Bookmarks, nullable: true })
    bookmark: Bookmarks | null;

    @ApiProperty()
    chapterCount: number;
}
