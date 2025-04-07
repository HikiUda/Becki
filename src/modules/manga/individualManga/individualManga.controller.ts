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
    UseGuards,
} from '@nestjs/common';
import { IndividualMangaControllerInterface } from './interfaces/individualMangaController';
import { IndividualMangaService } from './individualManga.service';
import { ValidateMangaIdPipe } from '../common/pipes/ValidateMangaIdPipe';
import { MangaIdsType } from '../common/types/mangaTypes';
import { LangType } from 'src/common/dto/langQuery.dto';
import { MangaDto } from './dto/manga.dto';
import { AuthUserRequest } from 'src/modules/user/auth/types/user';
import { UserMangaBookmarkDto, SetUserMangaBookmarkDto } from './dto/userMangaBookmark.dto';
import { JwtAuthGuard } from 'src/modules/user/auth/jwt-auth.guard';

@Controller('manga/byId/:id')
export class IndividualMangaController implements IndividualMangaControllerInterface {
    constructor(private individualMangaService: IndividualMangaService) {}

    @Get()
    async getManga(
        @Param('id', new ValidateMangaIdPipe()) id: MangaIdsType,
        @Query('lang', new DefaultValuePipe('ru')) lang: LangType,
    ): Promise<MangaDto> {
        return await this.individualMangaService.getManga(id, lang);
    }
    @UseGuards(JwtAuthGuard)
    @Get('bookmark')
    async getUserMangaBookmark(
        @Param('id', ParseIntPipe) mangaId: number,
        @Req() req: AuthUserRequest,
    ): Promise<UserMangaBookmarkDto> {
        return await this.individualMangaService.getUserMangaBookmark(mangaId, req.user.id);
    }
    @UseGuards(JwtAuthGuard)
    @Patch('bookmark')
    async setUserMangaBookmark(
        @Param('id', ParseIntPipe) mangaId: number,
        @Req() req: AuthUserRequest,
        @Body() body: SetUserMangaBookmarkDto,
    ): Promise<UserMangaBookmarkDto> {
        return await this.individualMangaService.setUserMangaBookmark(
            mangaId,
            req.user.id,
            body.bookmark,
        );
    }
    @UseGuards(JwtAuthGuard)
    @Delete('bookmark')
    async deleteUserMangaBookmark(
        @Param('id', ParseIntPipe) mangaId: number,
        @Req() req: AuthUserRequest,
    ): Promise<void> {
        await this.individualMangaService.deleteUserMangaBookmark(mangaId, req.user.id);
    }
}
