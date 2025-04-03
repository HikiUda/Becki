import { Controller, DefaultValuePipe, Get, Param, Query } from '@nestjs/common';
import { IndividualMangaControllerInterface } from './interfaces/individualMangaController';
import { IndividualMangaService } from './individualManga.service';
import { ValidateMangaIdPipe } from '../common/pipes/ValidateMangaIdPipe';
import { MangaIdsType } from '../common/types/mangaTypes';
import { LangType } from 'src/common/types/lang';
import { MangaDto } from './dto/manga.dto';

@Controller('manga')
export class IndividualMangaController implements IndividualMangaControllerInterface {
    constructor(private individualMangaService: IndividualMangaService) {}
    @Get('byId/:id')
    async getManga(
        @Param('id', new ValidateMangaIdPipe()) id: MangaIdsType,
        @Query('lang', new DefaultValuePipe('ru')) lang: LangType,
    ): Promise<MangaDto> {
        return await this.individualMangaService.getManga(id, lang);
    }
}
