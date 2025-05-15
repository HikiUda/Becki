import { ApiProperty } from '@nestjs/swagger';

export class UserBaseDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty({ type: 'string', nullable: true })
    avatar: string | null;
}
