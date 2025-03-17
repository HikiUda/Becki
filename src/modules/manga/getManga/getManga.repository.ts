import { Injectable } from '@nestjs/common';
import { GetMangaRepositoryInterface } from './interfaces/getMangaRepository';
import { MangaDto } from '../common/dto/manga.dto';
import * as prismaGetManga from './prisma/getManga';
import { LangType } from 'src/common/types/lang';

@Injectable()
export class GetMangaRepository implements GetMangaRepositoryInterface {
    constructor() {}
    async getManga(mangaId: number, lang: LangType): Promise<MangaDto> {
        const manga = await prismaGetManga.getManga(mangaId, lang);
        const dto = prismaGetManga.toMangaDto(manga, lang);
        //TODO handle error "have no manga"
        if (!dto) throw new Error('have no manga');
        return dto;
    }
}
