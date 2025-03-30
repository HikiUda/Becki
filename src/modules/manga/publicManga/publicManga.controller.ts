import { PublicMangaControllerInterface } from './interfaces/publicMangaController';
import { PublicMangaService } from './publicManga.service';
import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    HttpStatus,
    Param,
    Query,
    Req,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';

import { MangaDto } from './dto/manga.dto';
import { LangType } from 'src/common/types/lang';
import { MangaIdsType } from '../common/types/mangaTypes';
import { ValidateMangaIdPipe } from '../common/pipes/ValidateMangaIdPipe';
import { MangaListItemDto, MangaListQuery } from './dto/mangaListItem.dto';
import { ValidateMangaListQueryPipe } from './pipes/ValidateMangaListQueryPipe/ValidateMangaListQueryPipe';
import { MangaListItemStatisticDto } from './dto/mangaListItemStatistic.dto';
import { AuthInterceptor } from 'src/modules/user/auth/auth.interceptor';
import { AuthUserRequest, OptionalAuthUserRequest } from 'src/modules/user/auth/types/user';
import { JwtAuthGuard } from 'src/modules/user/auth/jwt-auth.guard';

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

    @Get('byId/:id')
    async getManga(
        @Param('id', new ValidateMangaIdPipe()) id: MangaIdsType,
        @Query('lang', new DefaultValuePipe('ru')) lang: LangType,
    ): Promise<MangaDto> {
        return await this.publicMangaService.getManga(id, lang);
    }

    @Get('quicksearch')
    @UseInterceptors(AuthInterceptor)
    async getMangaQuickSearch(
        @Query('search') search: string,
        @Query('lang') lang: LangType,
        @Req() req: OptionalAuthUserRequest,
    ): Promise<MangaListItemStatisticDto[]> {
        const userId = req.user ? req.user.id : null;
        return await this.publicMangaService.getMangaQuickSearch(search, lang, userId);
    }

    @Get('user-last-search-query')
    @UseGuards(JwtAuthGuard)
    async getUserLastSearchQueries(@Req() req: AuthUserRequest): Promise<string[]> {
        return await this.publicMangaService.getUserLastSearchQueries(req.user.id);
    }

    @Delete('user-last-search-query')
    @UseGuards(JwtAuthGuard)
    async deleteUserLastSearchQuery(
        @Req() req: AuthUserRequest,
        @Body('search') search: string,
    ): Promise<void> {
        await this.publicMangaService.deleteUserLastSearchQuery(search, req.user.id);
    }
}
