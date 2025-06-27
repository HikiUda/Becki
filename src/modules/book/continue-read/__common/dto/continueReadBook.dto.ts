import { ApiProperty } from '@nestjs/swagger';

export abstract class ContinueReadBookDto<T extends string> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    urlId: string;

    @ApiProperty()
    title: string;

    abstract type: T;

    @ApiProperty()
    cover: string;

    @ApiProperty()
    tome: number;

    @ApiProperty()
    chapter: number;

    @ApiProperty()
    chapterCount: number;

    @ApiProperty()
    readedChapters: number;

    @ApiProperty()
    chapterId: number;
}
