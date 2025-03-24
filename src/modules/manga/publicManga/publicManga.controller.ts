import { PublicMangaControllerInterface } from './interfaces/publicMangaController';
import { PublicMangaService } from './publicManga.service';
import { Controller, DefaultValuePipe, Get, Param, Query } from '@nestjs/common';

import { MangaDto } from './dto/manga.dto';
import { LangType } from 'src/common/types/lang';
import { MangaIdsType } from '../common/types/mangaTypes';
import { ValidateMangaIdPipe } from '../common/pipes/ValidateMangaIdPipe';
import { MangaListItemDto, MangaListQuery } from './dto/mangaListItem.dto';
import { ValidateMangaListQueryPipe } from './pipes/ValidateMangaListQueryPipe';

@Controller('manga')
export class PublicMangaController implements PublicMangaControllerInterface {
    constructor(private publicMangaService: PublicMangaService) {}

    @Get()
    async getMangaList(
        @Query(new ValidateMangaListQueryPipe()) query: MangaListQuery,
        @Query('lang', new DefaultValuePipe('ru')) lang: LangType,
    ): Promise<MangaListItemDto[]> {
        return await this.publicMangaService.getMangaList(query, lang);
    }

    @Get(':id')
    async getManga(
        @Param('id', new ValidateMangaIdPipe()) id: MangaIdsType,
        @Query('lang', new DefaultValuePipe('ru')) lang: LangType,
    ): Promise<MangaDto> {
        return await this.publicMangaService.getManga(id, lang);
    }
}
