import { ApiProperty } from '@nestjs/swagger';

export abstract class QuickSearchBookDto<T extends string> {
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
    views: number;

    @ApiProperty()
    likes: number;

    @ApiProperty()
    bookmarks: number;
}
