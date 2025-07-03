import { Body, Controller, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { EditBookChaptersControllerInterface } from '../__common/interfaces/editChapterController';
import { EditMangaChaptersService } from './editMangaChapters.service';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import {
    EditedBookChapterList,
    EditedBookChapterListQuery,
} from '../__common/dto/editedBookChapterList';
import { EditedBookChapter } from '../__common/dto/editedBookChapter.dto';
import { ApiCustomNotFoundResponse } from 'src/shared/decorators/api40xResponses';
import { MutateBookChapterDto } from '../__common/dto/mutateChapter.dto';
import { MangaChapterParams, MangaIdParam } from '../../_common/model/bookId';

@Controller('manga/:mangaId/edit/chapters')
export class EditMangaChaptersController implements EditBookChaptersControllerInterface {
    constructor(private service: EditMangaChaptersService) {}

    @Get()
    @ApiOkResponse({ type: EditedBookChapterList })
    async getEditedChapterList(
        @Param() params: MangaIdParam,
        @Query() query: EditedBookChapterListQuery,
    ): Promise<EditedBookChapterList> {
        return await this.service.getEditedChapterList(params.mangaId, query);
    }

    @Get(':chapterId')
    @ApiOkResponse({ type: EditedBookChapter })
    @ApiCustomNotFoundResponse()
    async getEditedChapter(@Param() params: MangaChapterParams): Promise<EditedBookChapter> {
        return await this.service.getEditedChapter(params.mangaId, params.chapterId);
    }

    @Post()
    @ApiResponse({ status: 204 })
    async createChapter(
        @Param() params: MangaIdParam,
        @Body() body: MutateBookChapterDto,
    ): Promise<void> {
        return await this.service.createChapter(params.mangaId, body);
    }

    @Put(':chapterId')
    @ApiResponse({ status: 204 })
    async updateChapter(
        @Param() params: MangaChapterParams,
        @Body() body: MutateBookChapterDto,
    ): Promise<void> {
        return await this.service.updateChapter(params.mangaId, params.chapterId, body);
    }

    @Patch(':chapterId/publish')
    @ApiResponse({ status: 204 })
    async toggleChapterPublish(@Param() params: MangaChapterParams): Promise<void> {
        return await this.service.toggleChapterPublish(params.mangaId, params.chapterId);
    }
}
