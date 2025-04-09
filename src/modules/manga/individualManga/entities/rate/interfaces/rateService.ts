import { UserMangaRateDto } from '../dto/userMangaRate.dto';

export interface RateServiceInterface {
    getUserMangaRate: (mangaId: number, userId: number) => Promise<UserMangaRateDto>;
    setUserMangaRate: (mangaId: number, userId: number, rate: number) => Promise<UserMangaRateDto>;
}
