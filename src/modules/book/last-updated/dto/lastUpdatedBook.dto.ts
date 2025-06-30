import { ApiProperty } from '@nestjs/swagger';

export abstract class LastUpdatedBook {
    @ApiProperty()
    id: number;

    @ApiProperty()
    urlId: string;

    @ApiProperty()
    title: string;

    abstract type: string;

    @ApiProperty()
    cover: string;

    @ApiProperty()
    tome: number;

    @ApiProperty()
    chapter: number;

    @ApiProperty()
    chapterCreatedAt: Date;

    @ApiProperty()
    chapterId: number;
}
