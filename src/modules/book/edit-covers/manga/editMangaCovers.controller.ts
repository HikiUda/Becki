import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { EditMangaCoversService } from './editMangaCovers.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { ApiCustomBadRequestResponse } from 'src/shared/decorators/api40xResponses';
import { EditedBookCoverList } from '../__common/dto/editedBookCovers.dto';
import { DeleteBookCoversDto } from '../__common/dto/deleteBookCovers.dto';
import { EditBookCoversControllerInterface } from '../__common/interfaces/editBookCoversController';
import { ApiAddCovers } from '../__common/ApiAddCovers';
import { SetMainMangaCoverParams } from '../__common/dto/setMainCoverParams.dto';
import { MangaIdParam } from '../../_common/model/bookId';

@Controller('manga/:mangaId/edit/covers')
export class EditMangaCoversController implements EditBookCoversControllerInterface {
    constructor(private service: EditMangaCoversService) {}

    @Get()
    @ApiOkResponse({ type: EditedBookCoverList })
    async getEditedCovers(@Param() params: MangaIdParam): Promise<EditedBookCoverList> {
        return await this.service.getEditedCovers(params.mangaId);
    }

    @Post()
    @ApiAddCovers()
    @ApiCustomBadRequestResponse()
    @UseInterceptors(FilesInterceptor('covers', 5))
    async addCovers(
        @Param() params: MangaIdParam,
        @UploadedFiles() covers: Express.Multer.File[],
    ): Promise<void> {
        if (!covers.length)
            throw new BadRequestException('В запросе должна быть как минимум одна обложка(cover).');
        await this.service.addCovers(params.mangaId, covers);
        return;
    }

    @Patch(':coverId')
    @ApiResponse({ status: 204 })
    async setMainCover(@Param() params: SetMainMangaCoverParams): Promise<void> {
        await this.service.setMainCover(params.mangaId, params.coverId);
        return;
    }

    @Delete()
    @ApiResponse({ status: 204 })
    async deleteCovers(
        @Param() params: MangaIdParam,
        @Body() body: DeleteBookCoversDto,
    ): Promise<void> {
        await this.service.deleteCovers(params.mangaId, body.coversId);
        return;
    }
}
