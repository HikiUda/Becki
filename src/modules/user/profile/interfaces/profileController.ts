import { AuthUserRequest } from '../../auth/types/user';
import { UserDataDto } from '../dto/userData.dto';

export interface ProfileControllerInterface {
    getUserData: (req: AuthUserRequest) => Promise<UserDataDto>;
}
