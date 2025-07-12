import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { EditMangaChaptersPagesControllerInterface } from './interfaces/editMangaChaptersPagesController';
import { EditMangaChaptersPagesService } from './editMangaChaptersPages.service';
import { MangaChapterParams } from '../_common/model/bookId';
import { MangaChapterPages, MangaChapterPagesDto } from '../_common/model/mangaChapterPages';
import { DeleteMangaChapterPage } from './dto/deleteMangaChapterPage.dto';
import { ApiBody, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { ApiCustomNotFoundResponse } from 'src/shared/decorators/api40xResponses';
import { AddPageResponse } from './dto/addPageResponse.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiAddPage } from './ApiAddPage';

@Controller('manga/:mangaId/edit/chapters/:chapterId/pages')
export class EditMangaChaptersPagesController implements EditMangaChaptersPagesControllerInterface {
    constructor(private service: EditMangaChaptersPagesService) {}

    @Get()
    @ApiOkResponse({ type: MangaChapterPagesDto })
    @ApiCustomNotFoundResponse()
    async getPages(@Param() params: MangaChapterParams): Promise<MangaChapterPages> {
        return await this.service.getPages(params);
    }

    @Post()
    @ApiAddPage()
    @UseInterceptors(FileInterceptor('page'))
    async addPage(
        @Param() params: MangaChapterParams,
        @UploadedFile() page: Express.Multer.File,
    ): Promise<AddPageResponse> {
        return { page: await this.service.addPage(params, page) };
    }

    @Put()
    @ApiBody({ type: MangaChapterPagesDto })
    @ApiResponse({ status: 204 })
    async updatePages(
        @Param() params: MangaChapterParams,
        @Body() body: MangaChapterPages,
    ): Promise<void> {
        await this.service.updatePages(params, body);
        return;
    }

    @Delete()
    @ApiResponse({ status: 204 })
    async deletePage(
        @Param() params: MangaChapterParams,
        @Body() body: DeleteMangaChapterPage,
    ): Promise<void> {
        await this.service.deletePage(params, body.page);
        return;
    }
}
