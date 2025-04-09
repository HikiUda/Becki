import { Injectable } from '@nestjs/common';
import { ContinueReadMangaServiceInterface } from './interfaces/continueReadMangaService';
import { ContinueReadMangaRepository } from './continueReadManga.repository';
import { MangaListItemContinueReadDto } from '../../dto/mangaListItemContinueRead.dto';
import { LangType } from 'src/common/dto/query/langQuery.dto';

@Injectable()
export class ContinueReadMangaService implements ContinueReadMangaServiceInterface {
    constructor(private continueReadMangaRepository: ContinueReadMangaRepository) {}
    async getContinueReadManga(
        userId: number,
        lang: LangType,
    ): Promise<MangaListItemContinueReadDto[]> {
        return await this.continueReadMangaRepository.getContinueReadManga(userId, lang);
    }
    async dontShowContinueReadManga(userId: number, mangaId: number): Promise<void> {
        await this.continueReadMangaRepository.dontShowContinueReadManga(userId, mangaId);
    }
}
