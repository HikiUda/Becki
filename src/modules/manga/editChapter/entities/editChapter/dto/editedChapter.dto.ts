import { ApiProperty } from '@nestjs/swagger';

export class EditChapterTitle {
    @ApiProperty({ type: 'string', nullable: true })
    ru: string | null;
    @ApiProperty({ type: 'string', nullable: true })
    en: string | null;
}

export class EditedChpaterDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    title: EditChapterTitle;
    @ApiProperty()
    tome: number;
    @ApiProperty()
    chpater: number;
    @ApiProperty()
    private: boolean;
    @ApiProperty()
    mangaId: number;
}
