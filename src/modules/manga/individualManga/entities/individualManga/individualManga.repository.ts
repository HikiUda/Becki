import { Injectable, NotFoundException } from '@nestjs/common';
import { IndividualMangaRepositoryInterface } from './interfaces/individualMangaRepository';
import { MangaDto } from './dto/manga.dto';
import { LangType } from 'src/common/dto/query/langQuery.dto';
import { getManga, toMangaDto } from './prisma/getManga';
import { MangaCoverDto } from './dto/mangaCovers.dto';
import { getMangaCovers } from './prisma/getMangaCovers';

@Injectable()
export class IndividualMangaRepository implements IndividualMangaRepositoryInterface {
    constructor() {}

    async getManga(mangaId: number, lang: LangType, userId?: number): Promise<MangaDto> {
        const manga = await getManga(mangaId, lang, userId);
        const dto = await toMangaDto(manga, lang);
        if (!dto) throw new NotFoundException('Тайтл не найден.');
        return dto;
    }
    async getMangaCovers(mangaId: number): Promise<MangaCoverDto[]> {
        return await getMangaCovers(mangaId);
    }
}
