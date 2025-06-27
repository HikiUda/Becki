import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { EditMangaControllerInterface } from '../__common/interfaces/editMangaController';
import { LangQueryDto } from 'src/shared/dto/query/langQuery.dto';
import { EditedMangaDto } from '../__common/dto/editedBook.dto';
import { MutateMangaType } from '../__common/dto/mutateManga/mutateManga.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { MangaFilesUploadType } from '../../types/fileUpload';
import { ValidateMangaIdPipe } from '../../../common/pipes/ValidateMangaIdPipe';
import { EditMangaService } from './editManga.service';
import { ParseJsonPipe } from 'src/modules/manga/common/pipes/ParseJsonPipe';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiMutateMangaDto } from '../__common/ApiMutateBookDto';
import { ParseMutateMangaDtoPipe } from '../../pipe/ParseMutateMangaDtoPipe';
import {
    ApiCustomBadRequestResponse,
    ApiCustomNotFoundResponse,
} from 'src/shared/decorators/api40xResponses';

@Controller('manga/edit')
export class EditMangaController implements EditMangaControllerInterface {
    constructor(private editMangaService: EditMangaService) {}

    @Get(':id')
    @ApiOkResponse({ type: EditedMangaDto })
    @ApiCustomNotFoundResponse()
    async getEditedManga(
        @Param('id', new ValidateMangaIdPipe()) id: number,
        @Query() query: LangQueryDto,
    ): Promise<EditedMangaDto> {
        return await this.editMangaService.getEditedManga(id, query.lang);
    }

    @Post()
    @ApiMutateMangaDto()
    @ApiCustomBadRequestResponse()
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'banner', maxCount: 1 },
            { name: 'covers', maxCount: 1 },
        ]),
    )
    async createManga(
        @Body('body', new ParseJsonPipe(), new ParseMutateMangaDtoPipe()) dto: MutateMangaType,
        @Query() query: LangQueryDto,
        @UploadedFiles() files: MangaFilesUploadType,
    ): Promise<EditedMangaDto> {
        return await this.editMangaService.createManga(dto, query.lang, files);
    }

    @Put(':id')
    @ApiMutateMangaDto(false)
    @ApiCustomBadRequestResponse()
    @UseInterceptors(FileInterceptor('banner'))
    async updateManga(
        @Param('id', new ValidateMangaIdPipe()) id: number,
        @Query() query: LangQueryDto,
        @Body('body', new ParseJsonPipe(), new DefaultValuePipe({}), new ParseMutateMangaDtoPipe())
        body: MutateMangaType,
        @UploadedFile() banner: Express.Multer.File,
    ): Promise<EditedMangaDto> {
        return await this.editMangaService.updateManga(body, id, query.lang, banner);
    }
    @Delete(':id')
    @ApiResponse({ status: 204 })
    async deleteManga(
        @Param('id', new ValidateMangaIdPipe()) id: number,
        @Query() query: LangQueryDto,
    ): Promise<void> {
        await this.editMangaService.deleteManga(id, query.lang);
    }
}
