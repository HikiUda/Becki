import { AuthUserRequest } from '../../../authorization/dto/user.dto';
import { UserDataDto } from '../dto/userData.dto';

export interface ProfileControllerInterface {
    getUserData: (req: AuthUserRequest) => Promise<UserDataDto>;
    updateJsonSettings: (req: AuthUserRequest, body: object) => Promise<void>;
}
