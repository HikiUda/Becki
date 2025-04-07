import {
    Controller,
    DefaultValuePipe,
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
import { PublicMangaService } from './publicManga.service';

import { LangQueryDto, LangType } from 'src/common/dto/langQuery.dto';
import { MangaListItemDto, MangaListQuery } from '../../dto/mangaListItem/mangaListItem.dto';
import { PublicMangaControllerInterface } from '../../interfaces/publicManga/publicMangaController';
import { ValidateMangaListQueryPipe } from '../../pipes/ValidateMangaListQueryPipe/ValidateMangaListQueryPipe';
import {
    AuthInterceptor,
    AuthUserRequest,
    JwtAuthGuard,
    OptionalAuthUserRequest,
} from 'src/modules/user/auth';
import {
    MangaListItemLastUpdatedPagination,
    MangaListItemLastUpdatedQueryDto,
} from '../../dto/mangaListItem/mangaListItemLastUpdated.dto';
import { MangaListItemContinueReadResponseArrayData } from '../../dto/mangaListItem/mangaListItemContinueRead.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { mockMangaListItemContinueReadArray } from '../../mock/mangaList/mockMangaListItemContinueRead';
import { mockMangaListItemLastUpdatedArray } from '../../mock/mangaList/mockMangaListItemLastUpdated';

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

    @Get('last-updated-mangas')
    @UseInterceptors(AuthInterceptor)
    @ApiResponse({
        example: mockMangaListItemLastUpdatedArray,
        description: "scope 'my' for authorized users only",
    })
    async getLastUpdatedMangas(
        @Req() req: OptionalAuthUserRequest,
        @Query() query: MangaListItemLastUpdatedQueryDto,
    ): Promise<MangaListItemLastUpdatedPagination> {
        if (query.scope === 'my' && !req.user) throw new UnauthorizedException();
        return await this.publicMangaService.getLastUpdatedMangas(query, req.user?.id);
    }

    @Get('continue-read')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ example: mockMangaListItemContinueReadArray })
    @ApiBearerAuth()
    async getContinueReadManga(
        @Req() req: AuthUserRequest,
        @Query() query: LangQueryDto,
    ): Promise<MangaListItemContinueReadResponseArrayData> {
        const data = await this.publicMangaService.getContinueReadManga(req.user.id, query.lang);
        return { data };
    }
    @Patch('continue-read/:id')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ description: 'set id to 0 to delete all manga' })
    @ApiBearerAuth()
    async dontShowContinueReadManga(
        @Req() req: AuthUserRequest,
        @Param('id', ParseIntPipe) mangaId: number,
    ): Promise<void> {
        await this.publicMangaService.dontShowContinueReadManga(req.user.id, mangaId);
    }
}
