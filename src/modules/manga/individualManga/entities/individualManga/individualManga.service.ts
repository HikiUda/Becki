import { Injectable } from '@nestjs/common';
import { IndividualMangaServiceInterface } from './interfaces/individualMangaService';
import { IndividualMangaRepository } from './individualManga.repository';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { MangaDto } from './dto/manga.dto';
import { MangaCoverArrayData } from './dto/mangaCovers.dto';
@Injectable()
export class IndividualMangaService implements IndividualMangaServiceInterface {
    constructor(private individualMangaRepository: IndividualMangaRepository) {}
    async getManga(id: number, lang: LangType, userId?: number): Promise<MangaDto> {
        const manga = await this.individualMangaRepository.getManga(id, lang, userId);
        return manga;
    }
    async getMangaCovers(mangaId: number): Promise<MangaCoverArrayData> {
        const data = await this.individualMangaRepository.getMangaCovers(mangaId);
        return { data };
    }
}
