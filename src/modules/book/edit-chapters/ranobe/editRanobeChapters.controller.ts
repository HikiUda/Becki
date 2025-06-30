import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { EditBookChaptersControllerInterface } from '../__common/interfaces/editChapterController';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import {
    EditedBookChapterList,
    EditedBookChapterListQuery,
} from '../__common/dto/editedBookChapterList';
import { ValidateBookIdPipe } from '../../_common/pipes/validateBookIdPipe';
import { EditedBookChapter } from '../__common/dto/editedBookChapter.dto';
import { ApiCustomNotFoundResponse } from 'src/shared/decorators/api40xResponses';
import { EditRanobeChapterParams } from '../__common/dto/editBookChapterParams.dto';
import { MutateBookChapterDto } from '../__common/dto/mutateChapter.dto';
import { EditRanobeChaptersService } from './editRanobeChapters.service';
import { ApiBookIdParam } from '../../_common/decorators/ApiBookIdParam';

@Controller('ranobe/:ranobeId/edit/chapters')
export class EditRanobeChaptersController implements EditBookChaptersControllerInterface {
    constructor(private service: EditRanobeChaptersService) {}

    @Get()
    @ApiBookIdParam('ranobeId')
    @ApiOkResponse({ type: EditedBookChapterList })
    async getEditedChapterList(
        @Param('ranobeId', new ValidateBookIdPipe()) bookId: number,
        @Query() query: EditedBookChapterListQuery,
    ): Promise<EditedBookChapterList> {
        return await this.service.getEditedChapterList(bookId, query);
    }

    @Get(':chapterId')
    @ApiBookIdParam('ranobeId')
    @ApiBookIdParam('chapterId', 'number Id')
    @ApiOkResponse({ type: EditedBookChapter })
    @ApiCustomNotFoundResponse()
    async getEditedChapter(@Param() params: EditRanobeChapterParams): Promise<EditedBookChapter> {
        return await this.service.getEditedChapter(params.ranobeId, params.chapterId);
    }

    @Post()
    @ApiBookIdParam('ranobeId')
    @ApiResponse({ status: 204 })
    async createChapter(
        @Param('ranobeId', new ValidateBookIdPipe()) bookId: number,
        @Body() body: MutateBookChapterDto,
    ): Promise<void> {
        return await this.service.createChapter(bookId, body);
    }

    @Put(':chapterId')
    @ApiBookIdParam('ranobeId')
    @ApiBookIdParam('chapterId', 'number Id')
    @ApiResponse({ status: 204 })
    async updateChapter(
        @Param() params: EditRanobeChapterParams,
        @Body() body: MutateBookChapterDto,
    ): Promise<void> {
        return await this.service.updateChapter(params.ranobeId, params.chapterId, body);
    }
}
