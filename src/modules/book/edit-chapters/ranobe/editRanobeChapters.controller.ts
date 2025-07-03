import { Body, Controller, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { EditBookChaptersControllerInterface } from '../__common/interfaces/editChapterController';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import {
    EditedBookChapterList,
    EditedBookChapterListQuery,
} from '../__common/dto/editedBookChapterList';
import { EditedBookChapter } from '../__common/dto/editedBookChapter.dto';
import { ApiCustomNotFoundResponse } from 'src/shared/decorators/api40xResponses';
import { MutateBookChapterDto } from '../__common/dto/mutateChapter.dto';
import { EditRanobeChaptersService } from './editRanobeChapters.service';
import { RanobeChapterParams, RanobeIdParam } from '../../_common/model/bookId';

@Controller('ranobe/:ranobeId/edit/chapters')
export class EditRanobeChaptersController implements EditBookChaptersControllerInterface {
    constructor(private service: EditRanobeChaptersService) {}

    @Get()
    @ApiOkResponse({ type: EditedBookChapterList })
    async getEditedChapterList(
        @Param() params: RanobeIdParam,
        @Query() query: EditedBookChapterListQuery,
    ): Promise<EditedBookChapterList> {
        return await this.service.getEditedChapterList(params.ranobeId, query);
    }

    @Get(':chapterId')
    @ApiOkResponse({ type: EditedBookChapter })
    @ApiCustomNotFoundResponse()
    async getEditedChapter(@Param() params: RanobeChapterParams): Promise<EditedBookChapter> {
        return await this.service.getEditedChapter(params.ranobeId, params.chapterId);
    }

    @Post()
    @ApiResponse({ status: 204 })
    async createChapter(
        @Param() params: RanobeIdParam,
        @Body() body: MutateBookChapterDto,
    ): Promise<void> {
        return await this.service.createChapter(params.ranobeId, body);
    }

    @Put(':chapterId')
    @ApiResponse({ status: 204 })
    async updateChapter(
        @Param() params: RanobeChapterParams,
        @Body() body: MutateBookChapterDto,
    ): Promise<void> {
        return await this.service.updateChapter(params.ranobeId, params.chapterId, body);
    }

    @Patch(':chapterId/publish')
    @ApiResponse({ status: 204 })
    async toggleChapterPublish(@Param() params: RanobeChapterParams): Promise<void> {
        return await this.service.toggleChapterPublish(params.ranobeId, params.chapterId);
    }
}
