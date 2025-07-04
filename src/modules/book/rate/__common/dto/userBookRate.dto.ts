import { ApiProperty } from '@nestjs/swagger';

export class UserBookRate {
    @ApiProperty()
    userId: number;
    @ApiProperty()
    bookId: number;
    @ApiProperty({ type: 'number', nullable: true })
    rate: number | null;
}
