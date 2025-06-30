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
import { EditBookCoversControllerInterface } from '../__common/interfaces/editBookCoversController';
import { ApiAddCovers } from '../__common/ApiAddCovers';
import { SetMainMangaCoverParamsDto } from '../__common/dto/setMainCoverParams.dto';
import { ApiBookIdParam } from '../../_common/decorators/ApiBookIdParam';

@Controller('manga/:mangaId/edit/covers')
export class EditMangaCoversController implements EditBookCoversControllerInterface {
    constructor(private service: EditMangaCoversService) {}

    @Get()
    @ApiBookIdParam('mangaId')
    @ApiOkResponse({ type: EditedBookCoverList })
    async getEditedCovers(
        @Param('mangaId', new ValidateBookIdPipe()) bookId: number,
    ): Promise<EditedBookCoverList> {
        return await this.service.getEditedCovers(bookId);
    }

    @Post()
    @ApiBookIdParam('mangaId')
    @ApiAddCovers()
    @ApiCustomBadRequestResponse()
    @UseInterceptors(FilesInterceptor('covers', 5))
    async addCovers(
        @Param('mangaId', new ValidateBookIdPipe()) bookId: number,
        @UploadedFiles() covers: Express.Multer.File[],
    ): Promise<void> {
        if (!covers.length)
            throw new BadRequestException('В запросе должна быть как минимум одна обложка(cover).');
        await this.service.addCovers(bookId, covers);
        return;
    }

    @Patch(':coverId')
    @ApiBookIdParam('mangaId')
    @ApiBookIdParam('coverId', 'number id')
    @ApiResponse({ status: 204 })
    async setMainCover(@Param() params: SetMainMangaCoverParamsDto): Promise<void> {
        await this.service.setMainCover(params.mangaId, params.coverId);
        return;
    }

    @Delete()
    @ApiBookIdParam('mangaId')
    @ApiResponse({ status: 204 })
    async deleteCovers(
        @Param('mangaId', new ValidateBookIdPipe()) bookId: number,
        @Body() body: DeleteBookCoversDto,
    ): Promise<void> {
        await this.service.deleteCovers(bookId, body.coversId);
        return;
    }
}
