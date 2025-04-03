import { PublicMangaControllerInterface } from './interfaces/publicMangaController';
import { PublicMangaService } from './publicManga.service';
import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Query,
    Req,
    UnauthorizedException,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';

import { LangType } from 'src/common/types/lang';
import { MangaListItemDto, MangaListQuery } from './dto/mangaListItem/mangaListItem.dto';
import { ValidateMangaListQueryPipe } from './pipes/ValidateMangaListQueryPipe/ValidateMangaListQueryPipe';
import { MangaListItemStatisticDto } from './dto/mangaListItem/mangaListItemStatistic.dto';
import { AuthInterceptor } from 'src/modules/user/auth/auth.interceptor';
import { AuthUserRequest, OptionalAuthUserRequest } from 'src/modules/user/auth/types/user';
import { JwtAuthGuard } from 'src/modules/user/auth/jwt-auth.guard';
import {
    MangaListItemLastUpdatedPagination,
    MangaListItemLastUpdatedQuery,
} from './dto/mangaListItem/mangaListItemLastUpdated.dto';
import { ValidateMangaListItemLastUpdatedQueryPipe } from './pipes/ValidateMangaListItemLastUpdatedQueryPipie';
import { MangaListItemContinueReadDto } from './dto/mangaListItem/mangaListItemContinueRead.dto';

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

    @Get('quicksearch')
    @UseInterceptors(AuthInterceptor)
    async getMangaQuickSearch(
        @Query('search') search: string,
        @Query('lang', new DefaultValuePipe('ru')) lang: LangType,
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

    @Get('last-updated-mangas')
    @UseInterceptors(AuthInterceptor)
    async getLastUpdatedMangas(
        @Req() req: OptionalAuthUserRequest,

        @Query(new ValidateMangaListItemLastUpdatedQueryPipe())
        query: MangaListItemLastUpdatedQuery,
    ): Promise<MangaListItemLastUpdatedPagination> {
        const userId = req.user ? req.user.id : undefined;
        if (query.scope === 'my' && !userId) throw new UnauthorizedException();
        return await this.publicMangaService.getLastUpdatedMangas(query, userId);
    }

    @Get('continue-read')
    @UseGuards(JwtAuthGuard)
    async getContinueReadManga(
        @Req() req: AuthUserRequest,
        @Query('lang', new DefaultValuePipe('ru')) lang: LangType,
    ): Promise<MangaListItemContinueReadDto[]> {
        return await this.publicMangaService.getContinueReadManga(req.user.id, lang);
    }
    @Patch('continue-read/:id')
    @UseGuards(JwtAuthGuard)
    async dontShowContinueReadManga(
        @Req() req: AuthUserRequest,
        @Param('id', ParseIntPipe) mangaId: number,
    ): Promise<void> {
        await this.publicMangaService.dontShowContinueReadManga(req.user.id, mangaId);
    }
}
