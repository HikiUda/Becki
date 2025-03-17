import { Injectable } from '@nestjs/common';
import { GetMangaServiceInterface } from './interfaces/getMangaService';
import { GetMangaRepository } from './getManga.repository';
import { MangaDto } from '../common/dto/manga.dto';
import { LangType } from 'src/common/types/lang';

@Injectable()
export class GetMangaService implements GetMangaServiceInterface {
    constructor(private getMangaRepository: GetMangaRepository) {}
    async getManga(id: number, lang: LangType): Promise<MangaDto> {
        //TODO add bookmark
        const manga = await this.getMangaRepository.getManga(id, lang);
        return manga;
    }
}
