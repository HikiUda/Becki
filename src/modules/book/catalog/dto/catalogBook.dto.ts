import { Bookmarks } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger'; // импортируй свои типы

export abstract class CatalogBookDto<T extends string> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    urlId: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    rate: number;

    abstract type: T;

    @ApiProperty()
    cover: string;

    @ApiProperty({ enum: Bookmarks, nullable: true })
    bookmark: Bookmarks | null;

    @ApiProperty()
    chapterCount: number;
}
