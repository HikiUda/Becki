import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicMangaRepositoryInterface } from './interfaces/publicMangaRepository';
import { MangaDto } from './dto/manga.dto';
import * as prismaGetManga from './prisma/getManga';
import { LangType } from 'src/common/types/lang';
import { MangaIdsType } from '../common/types/mangaTypes';
import { MangaListItemDto, MangaListQuery } from './dto/mangaListItem.dto';
import { getMangaList } from './prisma/getMangaList';
import { toMangaListItemDto } from './prisma/getMangaList/toMangaListItemDto';

@Injectable()
export class PublicMangaRepository implements PublicMangaRepositoryInterface {
    constructor() {}
    async getMangaList(query: MangaListQuery, lang: LangType): Promise<MangaListItemDto[]> {
        //TODO
        const mangaList = await getMangaList(query, lang);
        return toMangaListItemDto(mangaList, lang);
    }
    async getManga(mangaId: MangaIdsType, lang: LangType): Promise<MangaDto> {
        const manga = await prismaGetManga.getManga(mangaId, lang);
        const dto = await prismaGetManga.toMangaDto(manga, lang);
        if (!dto) throw new NotFoundException('Тайтл не найден.');
        return dto;
    }
}
