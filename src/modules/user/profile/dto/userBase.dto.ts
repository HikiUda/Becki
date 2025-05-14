import { ApiProperty } from '@nestjs/swagger';

export class UserBaseDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    avatar: string | null;
}
