import { JsonValue } from '@prisma/client/runtime/library';
import { UserBaseDto } from './userBase.dto';

export interface UserDataDto extends UserBaseDto {
    jsonSettings: JsonValue;
}
