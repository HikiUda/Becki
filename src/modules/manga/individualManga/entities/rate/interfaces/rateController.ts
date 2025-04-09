import { AuthUserRequest } from 'src/modules/user/auth';
import { SetUserMangaRateDto, UserMangaRateDto } from '../dto/userMangaRate.dto';

export interface RateControllerInterface {
    getUserMangaRate: (req: AuthUserRequest, id: number) => Promise<UserMangaRateDto>;
    setUserMangaRate: (
        req: AuthUserRequest,
        id: number,
        body: SetUserMangaRateDto,
    ) => Promise<UserMangaRateDto>;
}
