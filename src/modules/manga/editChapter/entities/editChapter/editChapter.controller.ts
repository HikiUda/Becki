import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { EditChapterControllerInterface } from './interfaces/editChapterController';
import { EditChapterService } from './editChapter.service';
import { EditedChpaterDto } from './dto/editedChapter.dto';
import { ValidateMangaIdPipe } from 'src/modules/manga/common/pipes/ValidateMangaIdPipe';
import { MutateChapterDto } from './dto/mutateChapter.dto';
import { GetMangaChapterIdDto } from '../../dto/getMangaChapterId.dto';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { EditedChapterListPagination, EditedChapterListQuery } from './dto/editedChapterList';
import { ApiCustomNotFoundResponse } from 'src/shared/decorators/api40xResponses';

@Controller('manga/edit/:mangaId/chapter')
export class EditChapterController implements EditChapterControllerInterface {
    constructor(private editChapterService: EditChapterService) {}

    @Get(':chapterId')
    @ApiOkResponse({ type: EditedChpaterDto })
    @ApiCustomNotFoundResponse()
    async getEditedChapter(@Param() ids: GetMangaChapterIdDto): Promise<EditedChpaterDto> {
        return await this.editChapterService.getEditedChapter(ids.chapterId);
    }
    @Get()
    @ApiOkResponse({ type: EditedChapterListPagination })
    async getEditedChapterList(
        @Param('mangaId', new ValidateMangaIdPipe()) mangaId: number,
        @Query() query: EditedChapterListQuery,
    ): Promise<EditedChapterListPagination> {
        return await this.editChapterService.getEditedChapterList(mangaId, query);
    }
    @Post()
    @ApiOkResponse({ type: EditedChpaterDto })
    async createChapter(
        @Param('mangaId', new ValidateMangaIdPipe()) mangaId: number,
        @Body() data: MutateChapterDto,
    ): Promise<EditedChpaterDto> {
        return await this.editChapterService.createChapter(mangaId, data);
    }
    @Put(':chapterId')
    @ApiOkResponse({ type: EditedChpaterDto })
    async updateChapter(
        @Param() ids: GetMangaChapterIdDto,
        @Body() data: MutateChapterDto,
    ): Promise<EditedChpaterDto> {
        return await this.editChapterService.updateChapter(ids.chapterId, data);
    }
    @Delete(':chapterId')
    @ApiResponse({ status: 204 })
    async deleteChapter(@Param() ids: GetMangaChapterIdDto): Promise<void> {
        await this.editChapterService.deleteChapter(ids.chapterId);
    }
}
