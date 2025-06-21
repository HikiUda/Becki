import { Controller, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { ContinueReadMangaControllerInterface } from './interfaces/continueReadMangaController';
import { ContinueReadMangaService } from './continueReadManga.service';
import { AuthUserRequest, JwtAuthGuard } from 'src/modules/user/auth';
import { ApiBearerAuth, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { LangQueryDto } from 'src/shared/dto/query/langQuery.dto';
import { MangaListItemContinueReadResponseArrayData } from '../../dto/mangaListItemContinueRead.dto';
import { ValidateMangaIdPipe } from 'src/modules/manga/common/pipes/ValidateMangaIdPipe';
import { ApiCustomUnauthorizedResponse } from 'src/shared/decorators/api40xResponses';

@ApiBearerAuth()
@ApiCustomUnauthorizedResponse()
@UseGuards(JwtAuthGuard)
@Controller('manga/continue-read')
export class ContinueReadMangaController implements ContinueReadMangaControllerInterface {
    constructor(private continueReadMangaService: ContinueReadMangaService) {}

    @Get()
    @ApiOkResponse({ type: MangaListItemContinueReadResponseArrayData })
    async getContinueReadManga(
        @Req() req: AuthUserRequest,
        @Query() query: LangQueryDto,
    ): Promise<MangaListItemContinueReadResponseArrayData> {
        const data = await this.continueReadMangaService.getContinueReadManga(
            req.user.id,
            query.lang,
        );
        return { data };
    }
    @Patch(':id')
    @ApiResponse({ description: 'set id to 0 to delete all manga', status: 204 })
    async dontShowContinueReadManga(
        @Req() req: AuthUserRequest,
        @Param('id', new ValidateMangaIdPipe()) mangaId: number,
    ): Promise<void> {
        await this.continueReadMangaService.dontShowContinueReadManga(req.user.id, mangaId);
    }
}
