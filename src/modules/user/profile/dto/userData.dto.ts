import { JsonValue } from '@prisma/client/runtime/library';
import { ApiProperty } from '@nestjs/swagger';

export class UserDataDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty({ type: 'string', nullable: true })
    avatar: string | null;
    @ApiProperty({ type: 'object', additionalProperties: true })
    jsonSettings: JsonValue;
}
