import { ApiProperty } from '@nestjs/swagger';

export class EditedBookChapter {
    @ApiProperty()
    id: number;
    @ApiProperty({ type: 'string', nullable: true })
    title: string | null;
    @ApiProperty()
    tome: number;
    @ApiProperty()
    chpater: number;
    @ApiProperty()
    publish: boolean;
    @ApiProperty()
    bookId: number;
}
