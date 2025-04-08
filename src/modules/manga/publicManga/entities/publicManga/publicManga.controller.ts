import {
    Controller,
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

import { LangQueryDto } from 'src/common/dto/query/langQuery.dto';
import { MangaListItemPagination } from '../../dto/mangaListItem/mangaListItem.dto';
import { PublicMangaControllerInterface } from '../../interfaces/publicManga/publicMangaController';
import {
    AuthInterceptor,
    AuthUserRequest,
    JwtAuthGuard,
    OptionalAuthUserRequest,
} from 'src/modules/user/auth';
import { MangaListItemLastUpdatedPagination } from '../../dto/mangaListItem/mangaListItemLastUpdated.dto';
import { MangaListItemLastUpdatedQueryDto } from '../../dto/publicManga/lastUpdatedMangaQuery.dto';
import { MangaListItemContinueReadResponseArrayData } from '../../dto/mangaListItem/mangaListItemContinueRead.dto';
import { ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { mockMangaListItemContinueReadArray } from '../../mock/mangaList/mockMangaListItemContinueRead';
import { mockMangaListItemLastUpdatedArray } from '../../mock/mangaList/mockMangaListItemLastUpdated';
import { MangaListQueryDto } from '../../dto/publicManga/getMangaListQuery';
import { mockMangaListItemArray } from '../../mock/mangaList/mockMangaListItem';

@Controller('manga')
export class PublicMangaController implements PublicMangaControllerInterface {
    constructor(private publicMangaService: PublicMangaService) {}

    @Get()
    @UseInterceptors(AuthInterceptor)
    @ApiResponse({ example: mockMangaListItemArray })
    @ApiQuery({
        name: 'janres-tags-notJanres-notTags',
        required: false,
        description: 'Comma-separated list of  IDs, e.g. janres=1,3,4',
    })
    async getMangaList(
        @Req() req: OptionalAuthUserRequest,
        @Query() query: MangaListQueryDto,
    ): Promise<MangaListItemPagination> {
        return await this.publicMangaService.getMangaList(query, req.user?.id);
    }

    @Get('last-updated-manga')
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
