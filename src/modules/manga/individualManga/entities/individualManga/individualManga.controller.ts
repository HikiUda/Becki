import { Controller, Get, Param, Query, Req, UseInterceptors } from '@nestjs/common';
import { IndividualMangaControllerInterface } from './interfaces/individualMangaController';
import { IndividualMangaService } from './individualManga.service';
import { ValidateMangaIdPipe } from '../../../common/pipes/ValidateMangaIdPipe';
import { LangQueryDto } from 'src/common/dto/query/langQuery.dto';
import { MangaDto } from './dto/manga.dto';
import { OptionalAuthUserRequest } from 'src/modules/user/auth/types/user';

import { AuthInterceptor } from 'src/modules/user/auth';
import { ApiResponse } from '@nestjs/swagger';
import { MangaCoverArrayData } from './dto/mangaCovers.dto';
import { mockManga } from './mock/mockManga';
import { mockMangaCoverArrayData } from './mock/mockMangaCovers';
import { ApiMangaIdParam } from 'src/modules/manga/common/decorators/ApiMangaIdParam/ApiMangaIdParam';

@ApiMangaIdParam()
@Controller('manga/byId/:id')
export class IndividualMangaController implements IndividualMangaControllerInterface {
    constructor(private individualMangaService: IndividualMangaService) {}

    @Get()
    @UseInterceptors(AuthInterceptor)
    @ApiResponse({ example: mockManga })
    async getManga(
        @Req() req: OptionalAuthUserRequest,
        @Param('id', new ValidateMangaIdPipe()) id: number,
        @Query() query: LangQueryDto,
    ): Promise<MangaDto> {
        return await this.individualMangaService.getManga(id, query.lang, req.user?.id);
    }

    @Get('covers')
    @ApiResponse({ example: mockMangaCoverArrayData })
    async getMangaCovers(
        @Param('id', new ValidateMangaIdPipe()) id: number,
    ): Promise<MangaCoverArrayData> {
        return await this.individualMangaService.getMangaCovers(id);
    }
}
