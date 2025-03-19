import { PublicMangaControllerInterface } from './interfaces/publicMangaController';
import { PublicMangaService } from './publicManga.service';
import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

import { MangaDto } from './dto/manga.dto';
import { LangType } from 'src/common/types/lang';

@Controller('manga')
export class PublicMangaController implements PublicMangaControllerInterface {
    constructor(private publicMangaService: PublicMangaService) {}
    @Get(':id')
    async getManga(
        @Param('id', ParseIntPipe) id: number,
        @Query('lang', new DefaultValuePipe('ru')) lang: LangType,
    ): Promise<MangaDto> {
        return await this.publicMangaService.getManga(id, lang);
    }
}
