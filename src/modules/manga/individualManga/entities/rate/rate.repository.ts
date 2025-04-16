import { Injectable } from '@nestjs/common';
import { RateRepositoryInterface } from './interfaces/rateRepository';
import { UserMangaRateDto } from './dto/userMangaRate.dto';
import { getUserMangaRate } from './prisma/getUserMangaRate';
import { setUserMangaRate } from './prisma/setUserMangaRate';

@Injectable()
export class RateRepository implements RateRepositoryInterface {
    constructor() {}
    async getUserMangaRate(mangaId: number, userId: number): Promise<UserMangaRateDto> {
        const data = await getUserMangaRate(mangaId, userId);
        if (!data || !data.rate) return { mangaId, userId, rate: null };
        return data;
    }
    async setUserMangaRate(
        mangaId: number,
        userId: number,
        rate: number,
    ): Promise<UserMangaRateDto> {
        return await setUserMangaRate(mangaId, userId, rate);
    }
}
