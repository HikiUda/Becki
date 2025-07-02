import { ApiProperty } from '@nestjs/swagger';

export class ContinueReadBook {
    @ApiProperty()
    tome: number;

    @ApiProperty()
    chapter: number;

    @ApiProperty({ type: 'number', nullable: true })
    chapterId: number | null;

    @ApiProperty()
    chapterCount: number;

    @ApiProperty()
    readedChapterCount: number;

    @ApiProperty()
    bookId: number;
}
