import { Injectable } from '@nestjs/common';
import { PublicMangaServiceInterface } from './interfaces/publicMangaService';
import { PublicMangaRepository } from './publicManga.repository';
import { MangaDto } from './dto/manga.dto';
import { LangType } from 'src/common/types/lang';
import { MangaIdsType } from '../common/types/mangaTypes';
import { MangaListItemDto, MangaListQuery } from './dto/mangaListItem.dto';

@Injectable()
export class PublicMangaService implements PublicMangaServiceInterface {
    constructor(private publicMangaRepository: PublicMangaRepository) {}
    async getMangaList(query: MangaListQuery, lang: LangType): Promise<MangaListItemDto[]> {
        return await this.publicMangaRepository.getMangaList(query, lang);
    }
    async getManga(id: MangaIdsType, lang: LangType): Promise<MangaDto> {
        //TODO add bookmark

        const manga = await this.publicMangaRepository.getManga(id, lang);
        return manga;
    }
}
