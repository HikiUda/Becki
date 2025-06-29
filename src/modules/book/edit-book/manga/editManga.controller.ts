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
import { EditBookControllerInterface } from '../__common/interfaces/editMangaController';
import { EditedMangaDto } from './dto/editedManga.dto';
import { MutateMangaDto, ParseBodyMutateMangaDto } from './dto/mutateManga.dto';
import { MutateBookFilesDto } from '../__common/dto/mutateBookFiles.dto';

@Controller('manga')
export class EditMangaController implements EditBookControllerInterface {
    constructor(private service: EditMangaService) {}

    @Get(':mangaId/edit')
    @ApiOkResponse({ type: EditedMangaDto })
    @ApiCustomNotFoundResponse()
    async getEditedBook(
        @Param('mangaId', new ValidateBookIdPipe()) mangaId: number,
        @Query() query: LangQueryDto,
    ): Promise<EditedMangaDto> {
        return await this.service.getEditedBook(mangaId, query.lang);
    }

    @Post()
    @ApiMutateBookDto(MutateMangaDto, EditedMangaDto)
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'banner', maxCount: 1 },
            { name: 'cover', maxCount: 1 },
        ]),
    )
    async createBook(
        @Body('body') body: ParseBodyMutateMangaDto,
        @Query() query: LangQueryDto,
        @UploadedFiles() files: MutateBookFilesDto,
    ): Promise<EditedMangaDto> {
        return await this.service.createBook(body, files, query.lang);
    }

    @Put(':mangaId/edit')
    @ApiMutateBookDto(MutateMangaDto, EditedMangaDto, false)
    @UseInterceptors(FileInterceptor('banner'))
    async updateBook(
        @Param('mangaId', new ValidateBookIdPipe()) mangaId: number,
        @Body('body') body: ParseBodyMutateMangaDto,
        @Query() query: LangQueryDto,
        @UploadedFile() banner: Express.Multer.File,
    ): Promise<EditedMangaDto> {
        return await this.service.updateBook(body, mangaId, query.lang, banner);
    }
}
