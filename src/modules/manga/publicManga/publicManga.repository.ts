import { Injectable } from '@nestjs/common';
import { PublicMangaRepositoryInterface } from './interfaces/publicMangaRepository';
import { MangaDto } from './dto/manga.dto';
import * as prismaGetManga from './prisma/getManga';
import { LangType } from 'src/common/types/lang';

@Injectable()
export class PublicMangaRepository implements PublicMangaRepositoryInterface {
    constructor() {}
    async getManga(mangaId: number, lang: LangType): Promise<MangaDto> {
        const manga = await prismaGetManga.getManga(mangaId, lang);
        const dto = prismaGetManga.toMangaDto(manga, lang);
        //TODO handle error "have no manga"
        if (!dto) throw new Error('have no manga');
        return dto;
    }
}
