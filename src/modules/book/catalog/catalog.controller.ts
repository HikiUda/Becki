import { Controller, Get, Query, Req, UseInterceptors } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogControllerInterface } from './interfaces/publicMangaController';
import { AuthInterceptor, OptionalAuthUserRequest } from 'src/modules/authorization';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CatalogMangaQuery } from './dto/catalogMangaQuery.dto';
import { CatalogMangaList } from './dto/catalogManga.dto';
import { CatalogRanobeList } from './dto/catalogRanobe.dto';
import { CatalogRanobeQuery } from './dto/catalogRanobeQuery.dto';

@Controller('catalog')
export class CatalogController implements CatalogControllerInterface {
    constructor(private service: CatalogService) {}

    @Get('manga')
    @ApiOkResponse({ type: CatalogMangaList })
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @ApiBearerAuth()
    @UseInterceptors(AuthInterceptor)
    async getCatalogManga(
        @Req() req: OptionalAuthUserRequest,
        @Query() query: CatalogMangaQuery,
    ): Promise<CatalogMangaList> {
        return await this.service.getCatalogManga(query, req.user?.id);
    }

    @Get('ranobe')
    @ApiOkResponse({ type: CatalogRanobeList })
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @ApiBearerAuth()
    @UseInterceptors(AuthInterceptor)
    async getCatalogRanobe(
        @Req() req: OptionalAuthUserRequest,
        @Query() query: CatalogRanobeQuery,
    ): Promise<CatalogRanobeList> {
        return await this.service.getCatalogRanobe(query, req.user?.id);
    }
}
