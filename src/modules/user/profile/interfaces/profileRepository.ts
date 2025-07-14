import { UserId } from 'src/modules/authorization';
import { UserDataDto } from '../dto/userData.dto';

export interface ProfileRepositoryInterface {
    getUserData: (userId: UserId) => Promise<UserDataDto>;
    getJsonSettings: (userId: UserId) => Promise<object | null>;
    setJsonSettings: (userId: UserId, data: object) => Promise<void>;
}
