import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicMangaRepositoryInterface } from './interfaces/publicMangaRepository';
import { MangaDto } from './dto/manga.dto';
import * as prismaGetManga from './prisma/getManga';
import { LangType } from 'src/common/types/lang';
import { MangaIdsType } from '../common/types/mangaTypes';

@Injectable()
export class PublicMangaRepository implements PublicMangaRepositoryInterface {
    constructor() {}
    async getManga(mangaId: MangaIdsType, lang: LangType): Promise<MangaDto> {
        const manga = await prismaGetManga.getManga(mangaId, lang);
        const dto = prismaGetManga.toMangaDto(manga, lang);
        if (!dto) throw new NotFoundException('Тайтл не найден.');
        return dto;
    }
}
