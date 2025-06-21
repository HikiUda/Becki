import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { EditMangaCoverControllerInterface } from './interfaces/editMangaCoverController';
import { EditMangaCoverService } from './editMangaCover.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EditedMangaCoverResponseArrayData } from './dto/editedMangaCover.dto';
import { MangaFilesUploadType } from '../../types/fileUpload';
import { ValidateMangaIdPipe } from 'src/modules/manga/common/pipes/ValidateMangaIdPipe';
import { DeleleMangaCoversDto } from './dto/deleteMangaCoversDto';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { ApiCustomBadRequestResponse } from 'src/shared/decorators/api40xResponses';

@Controller('manga/edit/:id/covers')
export class EditMangaCoverController implements EditMangaCoverControllerInterface {
    constructor(private editMangaCoverService: EditMangaCoverService) {}

    @Get()
    @ApiOkResponse({ type: EditedMangaCoverResponseArrayData })
    async getMangaCovers(
        @Param('id', new ValidateMangaIdPipe()) id: number,
    ): Promise<EditedMangaCoverResponseArrayData> {
        const covers = await this.editMangaCoverService.getMangaCovers(id);
        return { data: covers };
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                covers: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                    description: 'До 5 изображений обложек (формат — файл)',
                },
            },
        },
    })
    @ApiOkResponse({ type: EditedMangaCoverResponseArrayData })
    @ApiCustomBadRequestResponse()
    @UseInterceptors(FileFieldsInterceptor([{ name: 'covers', maxCount: 5 }]))
    async addMangaCovers(
        @Param('id', new ValidateMangaIdPipe()) id: number,
        @UploadedFiles() files: Omit<MangaFilesUploadType, 'banner'>,
    ): Promise<EditedMangaCoverResponseArrayData> {
        if (!files?.covers)
            throw new BadRequestException('В запросе должна быть как минимум одна обложка(cover).');
        const covers = await this.editMangaCoverService.addMangaCovers(id, files.covers);
        return { data: covers };
    }

    @Delete()
    @ApiResponse({ status: 204 })
    async deleteMangaCovers(@Body() body: DeleleMangaCoversDto): Promise<void> {
        await this.editMangaCoverService.deleteMangaCovers(body.coversId);
    }
}
