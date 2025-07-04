import { ApiProperty } from '@nestjs/swagger';
import { ResponseArrayData } from 'src/shared/dto/pagination.dto';

export abstract class QuickSearchBook {
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
    views: number;

    @ApiProperty()
    likes: number;

    @ApiProperty()
    bookmarks: number;
}

export type QuickSearchBookList = ResponseArrayData<QuickSearchBook>;
