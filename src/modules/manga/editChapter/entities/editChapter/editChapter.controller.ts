import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EditChapterControllerInterface } from './interfaces/editChapterController';
import { EditChapterService } from './editChapter.service';
import { EditedChpaterDto } from './dto/editedChapter.dto';
import { ValidateMangaIdPipe } from 'src/modules/manga/common/pipes/ValidateMangaIdPipe';
import { MutateChapterDto } from './dto/mutateChapter.dto';
import { GetMangaChapterIdDto } from '../../dto/getMangaChapterId.dto';
import { ApiResponse } from '@nestjs/swagger';
import { mockEditedChapter } from './mock/mockEditedChapter';

@Controller('manga/edit/:mangaId/chapter')
export class EditChapterController implements EditChapterControllerInterface {
    constructor(private editChapterService: EditChapterService) {}

    @Get(':chapterId')
    @ApiResponse({ example: mockEditedChapter })
    async getEditedChapter(@Param() ids: GetMangaChapterIdDto): Promise<EditedChpaterDto> {
        return await this.editChapterService.getEditedChapter(ids.chapterId);
    }
    @Post()
    @ApiResponse({ example: mockEditedChapter })
    async createChapter(
        @Param('mangaId', new ValidateMangaIdPipe()) mangaId: number,
        @Body() data: MutateChapterDto,
    ): Promise<EditedChpaterDto> {
        return await this.editChapterService.createChapter(mangaId, data);
    }
    @Put(':chapterId')
    @ApiResponse({ example: mockEditedChapter })
    async updateChapter(
        @Param() ids: GetMangaChapterIdDto,
        @Body() data: MutateChapterDto,
    ): Promise<EditedChpaterDto> {
        return await this.editChapterService.updateChapter(ids.chapterId, data);
    }
    @Delete(':chapterId')
    async deleteChapter(@Param() ids: GetMangaChapterIdDto): Promise<void> {
        await this.editChapterService.deleteChapter(ids.chapterId);
    }
}
