import { UserDataDto } from '../dto/userData.dto';

export interface ProfileRepositoryInterface {
    getUserData: (id: number) => Promise<UserDataDto>;
}
