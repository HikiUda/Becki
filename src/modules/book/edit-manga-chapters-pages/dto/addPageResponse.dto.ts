import { ApiProperty } from '@nestjs/swagger';

export class AddPageResponse {
    @ApiProperty()
    page: string;
}
