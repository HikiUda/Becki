import { JsonValue } from '@prisma/client/runtime/library';
import { UserBaseDto } from './userBase.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserDataDto extends UserBaseDto {
    @ApiProperty()
    jsonSettings: JsonValue;
}
