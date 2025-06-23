import { ApiProperty } from '@nestjs/swagger';

export abstract class LastUpdatedBookDto<T extends string> {
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
    chapterCreatedAt: Date;

    @ApiProperty()
    chapterId: number;
}
