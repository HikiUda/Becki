import { Injectable, NotFoundException } from '@nestjs/common';
import { IndividualMangaRepositoryInterface } from './interfaces/individualMangaRepository';
import { MangaDto } from './dto/manga.dto';
import { MangaIdsType } from '../common/types/mangaTypes';
import { LangType } from 'src/common/types/lang';
import { getManga, toMangaDto } from './prisma/getManga';

@Injectable()
export class IndividualMangaRepository implements IndividualMangaRepositoryInterface {
    constructor() {}
    async getManga(mangaId: MangaIdsType, lang: LangType): Promise<MangaDto> {
        const manga = await getManga(mangaId, lang);
        const dto = await toMangaDto(manga, lang);
        if (!dto) throw new NotFoundException('Тайтл не найден.');
        return dto;
    }
}
