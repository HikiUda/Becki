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
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MangaListQueryDto } from './dto/getMangaListQuery';
import { LangQueryDto } from 'src/shared/dto/query/langQuery.dto';
import { MangaListItemStatisticResponseArrayData } from '../../dto/mangaListItemStatistic.dto';
import { ValidateMangaIdPipe } from 'src/modules/manga/common/pipes/ValidateMangaIdPipe';
import { ApiMangaIdParam } from 'src/modules/manga/common/decorators/ApiMangaIdParam/ApiMangaIdParam';
import { ApiCustomUnauthorizedResponse } from 'src/shared/decorators/api40xResponses';

@Controller('manga')
export class PublicMangaController implements PublicMangaControllerInterface {
    constructor(private publicMangaService: PublicMangaService) {}

    @Get()
    @ApiOkResponse({ type: MangaListItemPagination })
    @UseInterceptors(AuthInterceptor)
    async getMangaList(
        @Req() req: OptionalAuthUserRequest,
        @Query() query: MangaListQueryDto,
    ): Promise<MangaListItemPagination> {
        return await this.publicMangaService.getMangaList(query, req.user?.id);
    }

    @Get('last-updated')
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @ApiBearerAuth()
    @ApiOkResponse({
        type: MangaListItemLastUpdatedPagination,
        description: "scope 'my' for authorized users only",
    })
    @ApiCustomUnauthorizedResponse()
    @UseInterceptors(AuthInterceptor)
    async getLastUpdatedMangas(
        @Req() req: OptionalAuthUserRequest,
        @Query() query: MangaListItemLastUpdatedQueryDto,
    ): Promise<MangaListItemLastUpdatedPagination> {
        if (query.scope === 'my' && !req.user) throw new UnauthorizedException();
        return await this.publicMangaService.getLastUpdatedMangas(query, req.user?.id);
    }
    @Get('related/:id')
    @ApiOkResponse({
        type: MangaListItemStatisticResponseArrayData,
    })
    @ApiMangaIdParam()
    async getRelatedManga(
        @Param('id', new ValidateMangaIdPipe()) id: number,
        @Query() query: LangQueryDto,
    ): Promise<MangaListItemStatisticResponseArrayData> {
        return await this.publicMangaService.getRelatedManga(id, query.lang);
    }
}
