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
import { ValidateBookIdPipe } from '../../_common/pipes/validateBookIdPipe';
import { DeleteBookCoversDto } from '../__common/dto/deleteBookCovers.dto';
import { EditBookCoversControllerInterface } from '../__common/interfaces/editBookCovesrController';
import { ApiAddCovers } from '../__common/ApiAddCovers';
import { SetMainMangaCoverParamsDto } from '../__common/dto/setMainCoverParams.dto';

@Controller('manga/:mangaId/edit/covers')
export class EditMangaCoversController implements EditBookCoversControllerInterface {
    constructor(private service: EditMangaCoversService) {}

    @Get()
    @ApiOkResponse({ type: EditedBookCoverList })
    async getEditedCovers(
        @Param('mangaId', new ValidateBookIdPipe()) mangaId: number,
    ): Promise<EditedBookCoverList> {
        return await this.service.getEditedCovers(mangaId);
    }

    @Post()
    @ApiAddCovers()
    @ApiCustomBadRequestResponse()
    @UseInterceptors(FilesInterceptor('covers', 5))
    async addCovers(
        @Param('mangaId', new ValidateBookIdPipe()) mangaId: number,
        @UploadedFiles() covers: Express.Multer.File[],
    ): Promise<void> {
        if (!covers.length)
            throw new BadRequestException('В запросе должна быть как минимум одна обложка(cover).');
        await this.service.addCovers(mangaId, covers);
        return;
    }

    @Patch(':coverId')
    @ApiResponse({ status: 204 })
    async setMainCover(@Param() params: SetMainMangaCoverParamsDto): Promise<void> {
        await this.service.setMainCover(params.mangaId, params.coverId);
        return;
    }

    @Delete()
    @ApiResponse({ status: 204 })
    async deleteCovers(
        @Param('mangaId', new ValidateBookIdPipe()) mangaId: number,
        @Body() body: DeleteBookCoversDto,
    ): Promise<void> {
        await this.service.deleteCovers(mangaId, body.coversId);
        return;
    }
}
