import { Controller, Get, Query, Req, UseInterceptors } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogControllerInterface } from './interfaces/publicMangaController';
import { AuthInterceptor, OptionalAuthUserRequest } from 'src/modules/user/auth';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CatalogMangaQueryDto } from './dto/catalogMangaQuery.dto';
import { CatalogMangaListDto } from './dto/catalogManga.dto';

@Controller('catalog')
export class CatalogController implements CatalogControllerInterface {
    constructor(private service: CatalogService) {}

    @Get('manga')
    @ApiOkResponse({ type: CatalogMangaListDto })
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @ApiBearerAuth()
    @UseInterceptors(AuthInterceptor)
    async getCatalogManga(
        @Req() req: OptionalAuthUserRequest,
        @Query() query: CatalogMangaQueryDto,
    ): Promise<CatalogMangaListDto> {
        return await this.service.getCatalogManga(query, req.user?.id);
    }
}
