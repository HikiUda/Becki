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
import { EditedRanobe } from './dto/editedRanobe.dto';
import { MutateRanobeDto, ParseBodyMutateRanobeDto } from './dto/mutateRanobe.dto';
import { MutateBookFilesDto } from '../__common/dto/mutateBookFiles.dto';
import { EditBookControllerInterface } from '../__common/interfaces/editBookController';
import { RanobeIdParam } from '../../_common/model/bookId';

@Controller('ranobe')
export class EditRanobeController implements EditBookControllerInterface {
    constructor(private service: EditRanobeService) {}

    @Get(':ranobeId/edit')
    @ApiOkResponse({ type: EditedRanobe })
    @ApiCustomNotFoundResponse()
    async getEditedBook(
        @Param() params: RanobeIdParam,
        @Query() query: LangQueryDto,
    ): Promise<EditedRanobe> {
        return await this.service.getEditedBook(params.ranobeId, query.lang);
    }

    @Post()
    @ApiMutateBookDto(MutateRanobeDto)
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'banner', maxCount: 1 },
            { name: 'cover', maxCount: 1 },
        ]),
    )
    async createBook(
        @Body('body') body: ParseBodyMutateRanobeDto,
        @UploadedFiles() files: MutateBookFilesDto,
    ): Promise<void> {
        await this.service.createBook(body, files);
        return;
    }

    @Put(':ranobeId/edit')
    @ApiMutateBookDto(MutateRanobeDto, false)
    @UseInterceptors(FileInterceptor('banner'))
    async updateBook(
        @Param() params: RanobeIdParam,
        @Body('body') body: ParseBodyMutateRanobeDto,
        @UploadedFile() banner: Express.Multer.File,
    ): Promise<void> {
        return await this.service.updateBook(body, params.ranobeId, banner);
    }
}
