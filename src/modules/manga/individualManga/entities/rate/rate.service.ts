import { Injectable } from '@nestjs/common';
import { RateServiceInterface } from './interfaces/rateService';
import { RateRepository } from './rate.repository';
import { UserMangaRateDto } from './dto/userMangaRate.dto';

@Injectable()
export class RateService implements RateServiceInterface {
    constructor(private rateRepository: RateRepository) {}
    async getUserMangaRate(mangaId: number, userId: number): Promise<UserMangaRateDto> {
        return await this.rateRepository.getUserMangaRate(mangaId, userId);
    }
    async setUserMangaRate(
        mangaId: number,
        userId: number,
        rate: number,
    ): Promise<UserMangaRateDto> {
        return await this.rateRepository.setUserMangaRate(mangaId, userId, rate);
    }
}
