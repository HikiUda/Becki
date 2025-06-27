import { Injectable } from '@nestjs/common';
import { ContinueReadMangaRepositoryInterface } from '../__common/interfaces/continueReadRepository';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { MangaListItemContinueReadDto } from '../../dto/mangaListItemContinueRead.dto';
import {
    getContinueReadManga,
    toMangaListItemContinueReadDto,
} from './prisma/getContinueReadManga';
import { dontShowContinueReadManga } from './prisma/dontShowContinueReadManga';

@Injectable()
export class ContinueReadMangaRepository implements ContinueReadMangaRepositoryInterface {
    constructor() {}
    async getContinueReadManga(
        userId: number,
        lang: LangType,
    ): Promise<MangaListItemContinueReadDto[]> {
        const data = await getContinueReadManga(userId, lang);
        return await toMangaListItemContinueReadDto(data, lang);
    }
    async dontShowContinueReadManga(userId: number, mangaId: number): Promise<void> {
        await dontShowContinueReadManga(userId, mangaId);
    }
}
