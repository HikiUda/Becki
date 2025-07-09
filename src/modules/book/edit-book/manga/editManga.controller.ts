import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { LangQuery } from 'src/shared/dto/langQuery.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { EditMangaService } from './editManga.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiMutateBookDto } from '../__common/ApiMutateBookDto';
import { ApiCustomNotFoundResponse } from 'src/shared/decorators/api40xResponses';
import { EditBookControllerInterface } from '../__common/interfaces/editBookController';
import { EditedManga } from './dto/editedManga.dto';
import { MutateMangaDto, ParseBodyMutateMangaDto } from './dto/mutateManga.dto';
import { MutateBookFilesDto } from '../__common/dto/mutateBookFiles.dto';
import { MangaIdParam } from '../../_common/model/bookId';

@Controller('manga')
export class EditMangaController implements EditBookControllerInterface {
    constructor(private service: EditMangaService) {}

    @Get(':mangaId/edit')
    @ApiOkResponse({ type: EditedManga })
    @ApiCustomNotFoundResponse()
    async getEditedBook(
        @Param() params: MangaIdParam,
        @Query() query: LangQuery,
    ): Promise<EditedManga> {
        return await this.service.getEditedBook(params.mangaId, query.lang);
    }

    @Post()
    @ApiMutateBookDto(MutateMangaDto)
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'banner', maxCount: 1 },
            { name: 'cover', maxCount: 1 },
        ]),
    )
    async createBook(
        @Body('body') body: ParseBodyMutateMangaDto,
        @UploadedFiles() files: MutateBookFilesDto,
    ): Promise<void> {
        await this.service.createBook(body, files);
        return;
    }

    @Put(':mangaId/edit')
    @ApiMutateBookDto(MutateMangaDto, false)
    @UseInterceptors(FileInterceptor('banner'))
    async updateBook(
        @Param() params: MangaIdParam,
        @Body('body') body: ParseBodyMutateMangaDto,
        @UploadedFile() banner?: Express.Multer.File,
    ): Promise<void> {
        return await this.service.updateBook(body, params.mangaId, banner);
    }
}
