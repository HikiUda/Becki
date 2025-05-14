import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'src/common/types/pagination';

export class ChapterListItemDto {
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

export class ChapterListPagination extends Pagination<ChapterListItemDto> {
    @ApiProperty({ type: [ChapterListItemDto] })
    data: ChapterListItemDto[];
}
