import { ApiProperty } from '@nestjs/swagger';

export class EditedBookChapterTitle {
    @ApiProperty({ type: 'string', nullable: true })
    ru: string | null;
    @ApiProperty({ type: 'string', nullable: true })
    en: string | null;
}

export class EditedBookChapter {
    @ApiProperty()
    id: number;
    @ApiProperty()
    title: EditedBookChapterTitle;
    @ApiProperty()
    tome: number;
    @ApiProperty()
    chpater: number;
    @ApiProperty()
    private: boolean;
    @ApiProperty()
    bookId: number;
}
