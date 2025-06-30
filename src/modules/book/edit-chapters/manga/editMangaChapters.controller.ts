import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { EditBookChaptersControllerInterface } from '../__common/interfaces/editChapterController';
import { EditMangaChaptersService } from './editMangaChapters.service';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import {
    EditedBookChapterList,
    EditedBookChapterListQuery,
} from '../__common/dto/editedBookChapterList';
import { ValidateBookIdPipe } from '../../_common/pipes/validateBookIdPipe';
import { EditedBookChapter } from '../__common/dto/editedBookChapter.dto';
import { ApiCustomNotFoundResponse } from 'src/shared/decorators/api40xResponses';
import { EditMangaChapterParams } from '../__common/dto/editBookChapterParams.dto';
import { MutateBookChapterDto } from '../__common/dto/mutateChapter.dto';
import { ApiBookIdParam } from '../../_common/decorators/ApiBookIdParam';

@Controller('manga/:mangaId/edit/chapters')
export class EditMangaChaptersController implements EditBookChaptersControllerInterface {
    constructor(private service: EditMangaChaptersService) {}

    @Get()
    @ApiBookIdParam('mangaId')
    @ApiOkResponse({ type: EditedBookChapterList })
    async getEditedChapterList(
        @Param('mangaId', new ValidateBookIdPipe()) bookId: number,
        @Query() query: EditedBookChapterListQuery,
    ): Promise<EditedBookChapterList> {
        return await this.service.getEditedChapterList(bookId, query);
    }

    @Get(':chapterId')
    @ApiBookIdParam('mangaId')
    @ApiBookIdParam('chapterId', 'number id')
    @ApiOkResponse({ type: EditedBookChapter })
    @ApiCustomNotFoundResponse()
    async getEditedChapter(@Param() params: EditMangaChapterParams): Promise<EditedBookChapter> {
        return await this.service.getEditedChapter(params.mangaId, params.chapterId);
    }

    @Post()
    @ApiBookIdParam('mangaId')
    @ApiResponse({ status: 204 })
    async createChapter(
        @Param('mangaId', new ValidateBookIdPipe()) bookId: number,
        @Body() body: MutateBookChapterDto,
    ): Promise<void> {
        return await this.service.createChapter(bookId, body);
    }

    @Put(':chapterId')
    @ApiBookIdParam('mangaId')
    @ApiBookIdParam('chapterId', 'number id')
    @ApiResponse({ status: 204 })
    async updateChapter(
        @Param() params: EditMangaChapterParams,
        @Body() body: MutateBookChapterDto,
    ): Promise<void> {
        return await this.service.updateChapter(params.mangaId, params.chapterId, body);
    }
}
