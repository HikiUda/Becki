import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { EditChapterPagesControllerInterface } from './interfaces/editChapterPagesController';
import { EditChapterPagesService } from './editChapterPages.service';
import { LangQueryDto } from 'src/common/dto/query/langQuery.dto';
import { ChapterPagesDto } from './dto/chapterPages.scheme';
import { GetMangaChapterIdDto } from '../../dto/getMangaChapterId.dto';
import { DeleteChapterPageDto } from './dto/deleteChapterPage.dto';
import { AddPageQuery } from './dto/addPageQuery';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiResponse } from '@nestjs/swagger';

@Controller('manga/edit/:mangaId/chapter/:chapterId/pages')
export class EditChapterPagesController implements EditChapterPagesControllerInterface {
    constructor(private editChapterPagesService: EditChapterPagesService) {}

    @Get()
    @ApiOkResponse({
        type: ChapterPagesDto,
    })
    async getChapterPages(
        @Param() ids: GetMangaChapterIdDto,
        @Query() query: LangQueryDto,
    ): Promise<ChapterPagesDto> {
        return await this.editChapterPagesService.getChapterPages(ids.chapterId, query.lang);
    }

    @Put()
    @ApiOkResponse({
        type: ChapterPagesDto,
    })
    async setChapterPages(
        @Param() ids: GetMangaChapterIdDto,
        @Body() body: ChapterPagesDto,
        @Query() query: LangQueryDto,
    ): Promise<ChapterPagesDto> {
        return await this.editChapterPagesService.setChapterPages(ids.chapterId, body, query.lang);
    }

    @Post('lang')
    @ApiOkResponse({
        type: ChapterPagesDto,
    })
    async addLangChapterPages(
        @Param() ids: GetMangaChapterIdDto,
        @Body() body: LangQueryDto,
    ): Promise<ChapterPagesDto> {
        return await this.editChapterPagesService.addLangChapterPages(ids.chapterId, body.lang);
    }

    @Delete('lang')
    @ApiResponse({ status: 204 })
    async deleteLangChapterPages(
        @Param() ids: GetMangaChapterIdDto,
        @Body() body: LangQueryDto,
    ): Promise<void> {
        await this.editChapterPagesService.deleteLangChapterPages(ids.chapterId, body.lang);
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiOkResponse({
        type: ChapterPagesDto,
        description: 'Возвращает данные в ответе только если returnValue=true',
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                page: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                    description: 'Одна страница за раз (формат — файл)',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('page'))
    async addPage(
        @Param() ids: GetMangaChapterIdDto,
        @UploadedFile() page: Express.Multer.File,
        @Query() query: AddPageQuery,
    ): Promise<ChapterPagesDto | void> {
        const data = await this.editChapterPagesService.addPage(
            ids.mangaId,
            ids.chapterId,
            page,
            query.lang,
        );
        if (query.returnValue) return data;
    }

    @Delete()
    @ApiResponse({ status: 204 })
    async deletePage(
        @Param() ids: GetMangaChapterIdDto,
        @Body() body: DeleteChapterPageDto,
        @Query() query: LangQueryDto,
    ): Promise<void> {
        await this.editChapterPagesService.deletePage(ids.chapterId, body.pageSrc, query.lang);
    }
}
