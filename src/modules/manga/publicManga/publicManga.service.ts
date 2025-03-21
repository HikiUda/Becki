import { Injectable } from '@nestjs/common';
import { PublicMangaServiceInterface } from './interfaces/publicMangaService';
import { PublicMangaRepository } from './publicManga.repository';
import { MangaDto } from './dto/manga.dto';
import { LangType } from 'src/common/types/lang';
import { MangaIdsType } from '../common/types/mangaTypes';

@Injectable()
export class PublicMangaService implements PublicMangaServiceInterface {
    constructor(private publicMangaRepository: PublicMangaRepository) {}
    async getManga(id: MangaIdsType, lang: LangType): Promise<MangaDto> {
        //TODO add bookmark
        const manga = await this.publicMangaRepository.getManga(id, lang);
        return manga;
    }
}
