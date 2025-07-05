import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'src/shared/dto/pagination.dto';

export class BookChapterListItem {
    @ApiProperty()
    id: number;
    @ApiProperty()
    tome: number;
    @ApiProperty()
    chapter: number;
    @ApiProperty({ type: 'string', nullable: true })
    title: string | null;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    isUserViewed: boolean;
}

export class BookChapterList extends Pagination<BookChapterListItem> {
    @ApiProperty({ type: [BookChapterListItem] })
    data: BookChapterListItem[];
}
