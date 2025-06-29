import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { EditBookChaptersControllerInterface } from '../__common/interfaces/editChapterController';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import {
    EditedBookChapterList,
    EditedBookChapterListQueryDto,
} from '../__common/dto/editedBookChapterList';
import { ValidateBookIdPipe } from '../../_common/pipes/validateBookIdPipe';
import { EditedBookChapterDto } from '../__common/dto/editedBookChapter.dto';
import { ApiCustomNotFoundResponse } from 'src/shared/decorators/api40xResponses';
import { EditRanobeChapterParamsDto } from '../__common/dto/editBookChapterParams.dto';
import { MutateBookChapterDto } from '../__common/dto/mutateChapter.dto';
import { EditRanobeChaptersService } from './editRanobeChapters.service';

@Controller('ranobe/:ranobeId/edit/chapters')
export class EditRanobeChaptersController implements EditBookChaptersControllerInterface {
    constructor(private service: EditRanobeChaptersService) {}

    @Get()
    @ApiOkResponse({ type: EditedBookChapterList })
    async getEditedChapterList(
        @Param('ranobeId', new ValidateBookIdPipe()) bookId: number,
        @Query() query: EditedBookChapterListQueryDto,
    ): Promise<EditedBookChapterList> {
        return await this.service.getEditedChapterList(bookId, query);
    }

    @Get(':chapterId')
    @ApiOkResponse({ type: EditedBookChapterDto })
    @ApiCustomNotFoundResponse()
    async getEditedChapter(
        @Param() params: EditRanobeChapterParamsDto,
    ): Promise<EditedBookChapterDto> {
        return await this.service.getEditedChapter(params.ranobeId, params.chapterId);
    }

    @Post()
    @ApiResponse({ status: 204 })
    async createChapter(
        @Param('ranobeId', new ValidateBookIdPipe()) bookId: number,
        @Body() dto: MutateBookChapterDto,
    ): Promise<void> {
        return await this.service.createChapter(bookId, dto);
    }

    @Put(':chapterId')
    @ApiResponse({ status: 204 })
    async updateChapter(
        @Param() params: EditRanobeChapterParamsDto,
        @Body() dto: MutateBookChapterDto,
    ): Promise<void> {
        return await this.service.updateChapter(params.ranobeId, params.chapterId, dto);
    }
}
