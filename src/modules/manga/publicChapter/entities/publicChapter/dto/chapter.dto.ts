import { ApiProperty } from '@nestjs/swagger';
import { ChapterPagesDto } from 'src/modules/manga/editChapter';

export class ChapterDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    tome: number;
    @ApiProperty()
    chapter: number;
    @ApiProperty({ type: 'string', nullable: true })
    title: string | null;
    @ApiProperty()
    mangaTitle: string;
    @ApiProperty()
    likeCount: number;
    @ApiProperty({ type: 'number', nullable: true })
    prevChapterId: number | null;
    @ApiProperty({ type: 'number', nullable: true })
    nextChapterId: number | null;
    @ApiProperty()
    isUserLiked: boolean;
    @ApiProperty()
    isUserViewed: boolean;
    @ApiProperty()
    pages: ChapterPagesDto;
}
