import { Injectable } from '@nestjs/common';
import { IndividualMangaServiceInterface } from './interfaces/individualMangaService';
import { IndividualMangaRepository } from './individualManga.repository';
import { LangType } from 'src/common/types/lang';
import { MangaDto } from './dto/manga.dto';
import { MangaIdsType } from '../common/types/mangaTypes';

@Injectable()
export class IndividualMangaService implements IndividualMangaServiceInterface {
    constructor(private individualMangaRepository: IndividualMangaRepository) {}
    async getManga(id: MangaIdsType, lang: LangType): Promise<MangaDto> {
        //TODO add bookmark

        const manga = await this.individualMangaRepository.getManga(id, lang);
        return manga;
    }
}
