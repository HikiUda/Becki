import { UserId } from 'src/modules/authorization';
import { UserDataDto } from '../dto/userData.dto';

export interface ProfileServiceInterface {
    getUserData: (userId: UserId) => Promise<UserDataDto>;
    updateJsonSettings: (userId: UserId, data: object) => Promise<void>;
}
