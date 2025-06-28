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
import { EditRanobeService } from './editRanobe.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiMutateBookDto } from '../__common/ApiMutateBookDto';
import { ApiCustomNotFoundResponse } from 'src/shared/decorators/api40xResponses';
import { ValidateBookIdPipe } from '../../_common/pipes/validateBookIdPipe';
import { EditedRanobeDto } from './dto/editedRanobe.dto';
import { MutateRanobeDto, ParseBodyMutateRanobeDto } from './dto/mutateRanobe.dto';
import { MutateBookFilesDto } from '../__common/dto/mutateBookFiles.dto';
import { EditBookControllerInterface } from '../__common/interfaces/editMangaController';

@Controller('ranobe')
export class EditRanobeController implements EditBookControllerInterface {
    constructor(private service: EditRanobeService) {}

    @Get(':ranobeId/edit')
    @ApiOkResponse({ type: EditedRanobeDto })
    @ApiCustomNotFoundResponse()
    async getEditedBook(
        @Param('ranobeId', new ValidateBookIdPipe()) ranobeId: number,
        @Query() query: LangQueryDto,
    ): Promise<EditedRanobeDto> {
        return await this.service.getEditedBook(ranobeId, query.lang);
    }

    @Post()
    @ApiMutateBookDto(MutateRanobeDto, EditedRanobeDto)
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'banner', maxCount: 1 },
            { name: 'cover', maxCount: 1 },
        ]),
    )
    async createBook(
        @Body('body') body: ParseBodyMutateRanobeDto,
        @Query() query: LangQueryDto,
        @UploadedFiles() files: MutateBookFilesDto,
    ): Promise<EditedRanobeDto> {
        return await this.service.createBook(body, files, query.lang);
    }

    @Put(':ranobeId/edit')
    @ApiMutateBookDto(MutateRanobeDto, EditedRanobeDto, false)
    @UseInterceptors(FileInterceptor('banner'))
    async updateBook(
        @Param('ranobeId', new ValidateBookIdPipe()) ranobeId: number,
        @Body('body') body: ParseBodyMutateRanobeDto,
        @Query() query: LangQueryDto,
        @UploadedFile() banner: Express.Multer.File,
    ): Promise<EditedRanobeDto> {
        return await this.service.updateBook(body, ranobeId, query.lang, banner);
    }
}
