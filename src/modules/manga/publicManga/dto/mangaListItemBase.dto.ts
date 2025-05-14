import { Bookmarks, MangaType } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger'; // импортируй свои типы

export class MangaListItemBaseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    urlId: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    rate: number;

    @ApiProperty({ enum: MangaType })
    type: MangaType;

    @ApiProperty()
    cover: string;

    @ApiProperty()
    views: number;

    @ApiProperty()
    likes: number;

    @ApiProperty()
    bookmarks: number;

    @ApiProperty({ enum: Bookmarks, nullable: true })
    bookmark: Bookmarks | null;

    @ApiProperty()
    tome: number;

    @ApiProperty()
    chapter: number;

    @ApiProperty()
    chapterCreatedAt: Date;

    @ApiProperty()
    chapterCount: number;

    @ApiProperty()
    readedChapters: number;

    @ApiProperty()
    chapterId: number;
}
