import { UserDataDto } from '../dto/userData.dto';

export interface ProfileServiceInterface {
    getUserData: (id: number) => Promise<UserDataDto>;
}
