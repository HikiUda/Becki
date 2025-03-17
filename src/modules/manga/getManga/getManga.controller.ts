import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetMangaControllerInterface } from './interfaces/getMangaController';
import { GetMangaService } from './getManga.service';
import { MangaDto } from '../common/dto/manga.dto';
import { LangType } from 'src/common/types/lang';

@Controller('manga')
export class GetMangaController implements GetMangaControllerInterface {
    constructor(private getMangaService: GetMangaService) {}

    @Get(':id')
    async getManga(
        @Param() params: { id: string },
        @Query() query: { lang: LangType },
    ): Promise<MangaDto> {
        //TODO check id is number
        const mangaId = Number(params.id);
        const lang = query.lang ? query.lang : 'ru';
        return await this.getMangaService.getManga(mangaId, lang);
    }
}
