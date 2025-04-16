import {
    Controller,
    Get,
    Param,
    Query,
    Req,
    UnauthorizedException,
    UseInterceptors,
} from '@nestjs/common';
import { PublicMangaService } from './publicManga.service';

import { MangaListItemPagination } from '../../dto/mangaListItem.dto';
import { PublicMangaControllerInterface } from './interfaces/publicMangaController';
import { AuthInterceptor, OptionalAuthUserRequest } from 'src/modules/user/auth';
import { MangaListItemLastUpdatedPagination } from '../../dto/mangaListItemLastUpdated.dto';
import { MangaListItemLastUpdatedQueryDto } from './dto/lastUpdatedMangaQuery.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { mockMangaListItemLastUpdatedArray } from '../../mock/mockMangaListItemLastUpdated';
import { MangaListQueryDto } from './dto/getMangaListQuery';
import { mockMangaListItemArray } from '../../mock/mockMangaListItem';
import { LangQueryDto } from 'src/common/dto/query/langQuery.dto';
import { MangaListItemStatisticResponseArrayData } from '../../dto/mangaListItemStatistic.dto';
import { ValidateMangaIdPipe } from 'src/modules/manga/common/pipes/ValidateMangaIdPipe';
import { mockMangaListItemStatisticArray } from '../../mock/mockMangaListItemStatistic.dto';
import { ApiMangaIdParam } from 'src/modules/manga/common/decorators/ApiMangaIdParam/ApiMangaIdParam';

@Controller('manga')
export class PublicMangaController implements PublicMangaControllerInterface {
    constructor(private publicMangaService: PublicMangaService) {}

    @Get()
    @UseInterceptors(AuthInterceptor)
    @ApiResponse({ example: mockMangaListItemArray })
    @ApiQuery({
        name: 'genres-tags-notGenres-notTags',
        required: false,
        description: 'Comma-separated list of  IDs, e.g. genres=1,3,4',
    })
    async getMangaList(
        @Req() req: OptionalAuthUserRequest,
        @Query() query: MangaListQueryDto,
    ): Promise<MangaListItemPagination> {
        return await this.publicMangaService.getMangaList(query, req.user?.id);
    }

    @Get('last-updated')
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
    @Get('related/:id')
    @ApiResponse({
        example: mockMangaListItemStatisticArray,
    })
    @ApiMangaIdParam()
    async getRelatedManga(
        @Param('id', new ValidateMangaIdPipe()) id: number,
        @Query() query: LangQueryDto,
    ): Promise<MangaListItemStatisticResponseArrayData> {
        return await this.publicMangaService.getRelatedManga(id, query.lang);
    }
}
