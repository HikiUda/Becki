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
import { LangQueryDto } from 'src/shared/dto/query/langQuery.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { EditMangaService } from './editManga.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiMutateBookDto } from '../__common/ApiMutateBookDto';
import { ApiCustomNotFoundResponse } from 'src/shared/decorators/api40xResponses';
import { ValidateBookIdPipe } from '../../_common/pipes/validateBookIdPipe';
import { EditBookControllerInterface } from '../__common/interfaces/editBookController';
import { EditedManga } from './dto/editedManga.dto';
import { MutateMangaDto, ParseBodyMutateMangaDto } from './dto/mutateManga.dto';
import { MutateBookFilesDto } from '../__common/dto/mutateBookFiles.dto';
import { ApiBookIdParam } from '../../_common/decorators/ApiBookIdParam';

@Controller('manga')
export class EditMangaController implements EditBookControllerInterface {
    constructor(private service: EditMangaService) {}

    @Get(':mangaId/edit')
    @ApiBookIdParam('mangaId')
    @ApiOkResponse({ type: EditedManga })
    @ApiCustomNotFoundResponse()
    async getEditedBook(
        @Param('mangaId', new ValidateBookIdPipe()) bookId: number,
        @Query() query: LangQueryDto,
    ): Promise<EditedManga> {
        return await this.service.getEditedBook(bookId, query.lang);
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
    @ApiBookIdParam('mangaId')
    @ApiMutateBookDto(MutateMangaDto, false)
    @UseInterceptors(FileInterceptor('banner'))
    async updateBook(
        @Param('mangaId', new ValidateBookIdPipe()) bookId: number,
        @Body('body') body: ParseBodyMutateMangaDto,
        @UploadedFile() banner: Express.Multer.File,
    ): Promise<void> {
        return await this.service.updateBook(body, bookId, banner);
    }
}
