import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicMangaRepositoryInterface } from './interfaces/publicMangaRepository';
import { MangaDto } from './dto/manga.dto';
import * as prismaGetManga from './prisma/getManga';
import { LangType } from 'src/common/types/lang';
import { MangaIdsType } from '../common/types/mangaTypes';
import { MangaListQuery } from './dto/mangaListItem.dto';
import { getMangaList } from './prisma/getMangaList';

@Injectable()
export class PublicMangaRepository implements PublicMangaRepositoryInterface {
    constructor() {}
    async getMangaList(query: MangaListQuery, lang: LangType): Promise<MangaDto> {
        //TODO
        return (await getMangaList(query)) as unknown as MangaDto;
    }
    async getManga(mangaId: MangaIdsType, lang: LangType): Promise<MangaDto> {
        const manga = await prismaGetManga.getManga(mangaId, lang);
        const dto = prismaGetManga.toMangaDto(manga, lang);
        if (!dto) throw new NotFoundException('Тайтл не найден.');
        return dto;
    }
}
