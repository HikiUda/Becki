import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { EditBookChaptersControllerInterface } from '../__common/interfaces/editChapterController';
import { EditMangaChaptersService } from './editMangaChapters.service';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import {
    EditedBookChapterList,
    EditedBookChapterListQueryDto,
} from '../__common/dto/editedBookChapterList';
import { ValidateBookIdPipe } from '../../_common/pipes/validateBookIdPipe';
import { EditedBookChapterDto } from '../__common/dto/editedBookChapter.dto';
import { ApiCustomNotFoundResponse } from 'src/shared/decorators/api40xResponses';
import { EditMangaChapterParamsDto } from '../__common/dto/editBookChapterParams.dto';
import { MutateBookChapterDto } from '../__common/dto/mutateChapter.dto';

@Controller('manga/:mangaId/edit/chapters')
export class EditMangaChaptersController implements EditBookChaptersControllerInterface {
    constructor(private service: EditMangaChaptersService) {}

    @Get()
    @ApiOkResponse({ type: EditedBookChapterList })
    async getEditedChapterList(
        @Param('mangaId', new ValidateBookIdPipe()) bookId: number,
        @Query() query: EditedBookChapterListQueryDto,
    ): Promise<EditedBookChapterList> {
        return await this.service.getEditedChapterList(bookId, query);
    }

    @Get(':chapterId')
    @ApiOkResponse({ type: EditedBookChapterDto })
    @ApiCustomNotFoundResponse()
    async getEditedChapter(
        @Param() params: EditMangaChapterParamsDto,
    ): Promise<EditedBookChapterDto> {
        return await this.service.getEditedChapter(params.mangaId, params.chapterId);
    }

    @Post()
    @ApiResponse({ status: 204 })
    async createChapter(
        @Param('mangaId', new ValidateBookIdPipe()) bookId: number,
        @Body() dto: MutateBookChapterDto,
    ): Promise<void> {
        return await this.service.createChapter(bookId, dto);
    }

    @Put(':chapterId')
    @ApiResponse({ status: 204 })
    async updateChapter(
        @Param() params: EditMangaChapterParamsDto,
        @Body() dto: MutateBookChapterDto,
    ): Promise<void> {
        return await this.service.updateChapter(params.mangaId, params.chapterId, dto);
    }
}
