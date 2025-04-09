import { UserMangaRateDto } from '../dto/userMangaRate.dto';

export interface RateRepositoryInterface {
    getUserMangaRate: (mangaId: number, userId: number) => Promise<UserMangaRateDto>;
    setUserMangaRate: (mangaId: number, userId: number, rate: number) => Promise<UserMangaRateDto>;
}
