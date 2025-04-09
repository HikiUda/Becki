import { Injectable } from '@nestjs/common';
import { RateRepositoryInterface } from './interfaces/rateRepository';
import { UserMangaRateDto } from './dto/userMangaRate.dto';
import { getUserMangaRate } from './prisma/getUserMangaRate';
import { setUserMangaRate } from './prisma/setUserMangaRate';

@Injectable()
export class RateRepository implements RateRepositoryInterface {
    constructor() {}
    async getUserMangaRate(mangaId: number, userId: number): Promise<UserMangaRateDto> {
        return (await getUserMangaRate(mangaId, userId)) || { mangaId, userId, rate: null };
    }
    async setUserMangaRate(
        mangaId: number,
        userId: number,
        rate: number,
    ): Promise<UserMangaRateDto> {
        return await setUserMangaRate(mangaId, userId, rate);
    }
}
